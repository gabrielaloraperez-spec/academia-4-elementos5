import React, { useMemo, useState } from 'react';
import { useGame } from '../context/useGame';
import { Level } from '../data/gameData';
import { ProgressBar, Hearts, ScoreDisplay, AnswerButton, Feedback, AbilityButton, HintDisplay } from '../components/GameComponents';

interface LevelScreenProps {
  level: Level;
  onComplete: () => void;
  onKnowledge: () => void;
  onExitToMap: () => void;
}

interface SublevelConfig {
  id: number;
  name: string;
  start: number;
  end: number;
  objective: string;
  flavor: string;
}

export const LevelScreen: React.FC<LevelScreenProps> = ({ level, onComplete, onExitToMap }) => {
  const { state, answerQuestion, useAbility: activateAbility, getAbilityData, resetLevel } = useGame();
  const [currentProblem, setCurrentProblem] = useState(0);
  const [currentSublevel, setCurrentSublevel] = useState(0);
  const [showTransition, setShowTransition] = useState(true);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [multiplierActive, setMultiplierActive] = useState(false);
  const [shieldActive, setShieldActive] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [gameOverConfig, setGameOverConfig] = useState<{ message: string; action: 'map' | 'retry-sublevel'; button: string } | null>(null);

  const sublevels: SublevelConfig[] = useMemo(() => {
    const operationSublevels: Record<string, Omit<SublevelConfig, 'start' | 'end'>[]> = {
      addition: [
        { id: 1, name: 'Chispa Inicial', objective: 'Practicar sumas de una cifra.', flavor: 'Cada resultado es una chispa que enciende tu dominio del fuego.' },
        { id: 2, name: 'Llama Creciente', objective: 'Practicar sumas de dos cifras.', flavor: 'Dominar el llevar es controlar el fuego sin que se desborde.' },
        { id: 3, name: 'Fuego Supremo', objective: 'Practicar sumas de tres cifras.', flavor: 'Un verdadero Guardián no teme al incendio: lo dirige.' },
      ],
      subtraction: [
        { id: 1, name: 'Brisa Suave', objective: 'Practicar restas de una cifra.', flavor: 'La brisa te enseñará que quitar también es crear espacio.' },
        { id: 2, name: 'Viento Firme', objective: 'Practicar restas de dos cifras.', flavor: 'Mantén el equilibrio cuando debas pedir prestado.' },
        { id: 3, name: 'Tormenta Serena', objective: 'Practicar restas de tres cifras.', flavor: 'Domina el arte de restar sin perder la calma.' },
      ],
      multiplication: [
        { id: 1, name: 'Semilla', objective: 'Practicar multiplicaciones por una cifra.', flavor: 'Cada resultado es una semilla que multiplica tu poder.' },
        { id: 2, name: 'Raíces Profundas', objective: 'Practicar multiplicaciones por dos cifras.', flavor: 'Construye el resultado paso a paso y tu dominio crecerá.' },
        { id: 3, name: 'Bosque Infinito', objective: 'Practicar multiplicaciones más complejas.', flavor: 'Tu poder se expandirá sin límites.' },
      ],
      division: [
        { id: 1, name: 'Gota Clara', objective: 'Practicar divisiones exactas de una cifra.', flavor: 'La claridad comienza cuando repartes con justicia.' },
        { id: 2, name: 'Corriente Fluida', objective: 'Practicar divisiones de dos cifras.', flavor: 'Mantén el flujo incluso cuando el cálculo se vuelve más complejo.' },
        { id: 3, name: 'Marea Profunda', objective: 'Practicar divisiones con residuo.', flavor: 'No todo se divide perfectamente y eso también es sabiduría.' },
      ],
    };

    const selected = operationSublevels[level.operation] ?? operationSublevels.addition;
    return selected.map((sublevel, index) => ({
      ...sublevel,
      start: index * 3,
      end: index === 2 ? 9 : index * 3 + 2,
    }));
  }, [level.operation]);

  const problem = level.problems[currentProblem];
  const sublevel = sublevels[currentSublevel];

  const handleSublevelFailure = () => {
    if (sublevel.id === 1) {
      setGameOverConfig({
        message: 'Para dominar este reino debes practicar más. No te des por vencido..',
        action: 'map',
        button: 'Volver al mapa del reino',
      });
      return;
    }

    if (sublevel.id === 2) {
      setGameOverConfig({
        message: 'Game over. Un maestro ensaya sus habilidades hasta dominarlas. No te rindas.',
        action: 'retry-sublevel',
        button: 'Reiniciar subnivel 2',
      });
      return;
    }

    setGameOverConfig({
      message: 'Game over. Necesitas enfocar tu energía para ser un gran maestro, respira y vuelve a intentarlo.',
      action: 'retry-sublevel',
      button: 'Reiniciar subnivel 3',
    });
  };

  const handleGameOverAction = () => {
    if (!gameOverConfig) return;

    if (gameOverConfig.action === 'map') {
      onExitToMap();
      return;
    }

    resetLevel();
    setCurrentProblem(sublevel.start);
    setShowTransition(true);
    setMultiplierActive(false);
    setShieldActive(false);
    setShowHint(false);
    setFeedback(null);
    setGameOverConfig(null);
  };

  const handleAnswer = (answer: number) => {
    if (feedback !== null || !problem) return;

    const isCorrect = answer === problem.answer;
    const willLoseAllLives = !isCorrect && !shieldActive && state.lives <= 1;

    if (isCorrect) {
      setFeedback('correct');
      setShowHint(false);
      const scoreMultiplier = multiplierActive ? 2 : 1;
      if (multiplierActive) {
        setMultiplierActive(false);
      }
      answerQuestion(true, false, scoreMultiplier);
    } else if (shieldActive) {
      setShieldActive(false);
      setFeedback('correct');
      setShowHint(false);
      answerQuestion(true);
    } else {
      setFeedback('incorrect');
      if (problem.hint) {
        setShowHint(true);
      }
      answerQuestion(false);
    }

    setTimeout(() => {
      setFeedback(null);
      setShowHint(false);

      if (willLoseAllLives) {
        handleSublevelFailure();
        return;
      }

      if (currentProblem < sublevel.end) {
        setCurrentProblem(prev => prev + 1);
        return;
      }

      if (currentSublevel < sublevels.length - 1) {
        const nextSublevel = currentSublevel + 1;
        setCurrentSublevel(nextSublevel);
        setCurrentProblem(sublevels[nextSublevel].start);
        setShowTransition(true);
        setMultiplierActive(false);
        setShieldActive(false);
        return;
      }

      onComplete();
    }, 1200);
  };

  const handleUseAbility = (abilityId: string) => {
    const success = activateAbility(abilityId);
    if (success) {
      if (abilityId === 'multiplier') {
        setMultiplierActive(true);
      } else if (abilityId === 'shield') {
        setShieldActive(true);
      }
    }
  };

  if (gameOverConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: level.bgColor }}>
        <div className="max-w-xl w-full bg-white rounded-3xl p-8 text-center shadow-2xl border-2" style={{ borderColor: level.color }}>
          <div className="text-6xl mb-4">💫</div>
          <h2 className="text-3xl font-bold mb-3" style={{ color: level.color }}>Game Over</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">{gameOverConfig.message}</p>
          <button
            onClick={handleGameOverAction}
            className="w-full py-3 rounded-xl text-white font-bold"
            style={{ backgroundColor: level.color }}
          >
            {gameOverConfig.button}
          </button>
        </div>
      </div>
    );
  }

  if (showTransition) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: level.bgColor }}>
        <div className="max-w-xl w-full rounded-3xl p-8 text-center shadow-2xl bg-white">
          <div className="text-6xl mb-4">{level.icon}</div>
          <h2 className="text-3xl font-bold mb-1" style={{ color: level.color }}>{level.name}</h2>
          <p className="font-semibold mb-4" style={{ color: level.color }}>Subnivel {sublevel.id}: {sublevel.name}</p>
          <p className="text-lg font-bold">Objetivo: {sublevel.objective}</p>
          <p className="mt-2 text-gray-600">{sublevel.flavor}</p>
          <button
            onClick={() => setShowTransition(false)}
            className="mt-6 px-8 py-3 rounded-xl text-white font-bold"
            style={{ backgroundColor: level.color }}
          >
            Comenzar {sublevel.name}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: level.bgColor }}>
      <div className="p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">{level.icon}</span>
              <span className="font-bold" style={{ color: level.color }}>{level.name}</span>
            </div>
            <Hearts lives={state.lives} />
          </div>

          <ProgressBar current={currentProblem + 1} total={level.problems.length} color={level.color} />

          <div className="flex justify-between items-center mt-4">
            <ScoreDisplay score={state.score} streak={state.streak} />
            <div className="text-sm font-medium" style={{ color: level.color }}>
              {sublevel.name} · Pregunta {currentProblem + 1}/{level.problems.length}
            </div>
          </div>
        </div>
      </div>

      {shieldActive && (
        <div className="px-4 mb-2">
          <div className="max-w-md mx-auto bg-blue-100 border-2 border-blue-400 rounded-xl p-2 text-center">
            <span className="text-blue-600 font-bold">🛡️ Escudo Activo</span>
          </div>
        </div>
      )}

      {multiplierActive && (
        <div className="px-4 mb-2">
          <div className="max-w-md mx-auto bg-amber-100 border-2 border-amber-400 rounded-xl p-2 text-center">
            <span className="text-amber-600 font-bold">⭐ x2 Puntos Activado</span>
          </div>
        </div>
      )}

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl p-8 shadow-xl text-center">
            {showHint && problem?.hint && (
              <div className="mb-6">
                <HintDisplay hint={problem.hint} />
              </div>
            )}

            <div className="text-6xl font-bold text-gray-800 mb-8">{problem?.question}</div>

            <div className="grid grid-cols-2 gap-4">
              {problem?.options.map((option, index) => (
                <AnswerButton
                  key={index}
                  value={option}
                  onClick={() => handleAnswer(option)}
                  disabled={feedback !== null}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-4 gap-2">
            {['shield', 'recharge', 'multiplier', 'extratime'].map((abilityId) => {
              const ability = getAbilityData(abilityId);
              if (!ability) return null;
              return (
                <AbilityButton
                  key={abilityId}
                  id={abilityId}
                  name={ability.name}
                  icon={ability.icon}
                  cost={ability.cost}
                  usesLeft={state.abilityUses[abilityId]}
                  available={state.mana >= ability.cost && state.abilityUses[abilityId] > 0}
                  onClick={() => handleUseAbility(abilityId)}
                />
              );
            })}
          </div>
          <div className="text-center text-purple-600 text-sm mt-2">💎 Maná disponible: {state.mana}</div>
        </div>
      </div>

      {feedback && (
        <Feedback
          type={feedback}
          message={feedback === 'incorrect' ? `La respuesta era ${problem?.answer}` : undefined}
        />
      )}
    </div>
  );
};
