import React, { useEffect, useMemo, useState } from 'react';
import { Level } from '../data/gameData';
import { AbilityButton, ManaBar } from '../components/game/GameComponents';
import { useGame } from '../context/useGame';
import { playCorrect, playSuccess, playUiClick, playWrong } from '../utils/sound';

interface KnowledgeRoomProps {
  level: Level;
  onComplete: () => void;
}

export const KnowledgeRoom: React.FC<KnowledgeRoomProps> = ({ level, onComplete }) => {
  const { state, useAbility: activateAbility, getAbilityData } = useGame();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [allCorrect, setAllCorrect] = useState(true);
  const [shieldActive, setShieldActive] = useState(false);
  const [insightActive, setInsightActive] = useState(false);
  const [shieldSavedAnswer, setShieldSavedAnswer] = useState(false);

  const { knowledge } = level;
  const question = knowledge.miniQuestions[currentQuestion];

  const hiddenWrongIndexes = useMemo(() => {
    if (!insightActive) return new Set<number>();
    const wrongIndexes = question.options
      .map((_, index) => index)
      .filter((index) => index !== question.correctAnswer)
      .slice(0, 1);
    return new Set(wrongIndexes);
  }, [insightActive, question]);

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;

    const answeredCorrectly = answerIndex === question.correctAnswer;
    const correctedByShield = !answeredCorrectly && shieldActive;

    setSelectedAnswer(answerIndex);
    setShowResult(true);

    if (!answeredCorrectly && !correctedByShield) {
      playWrong();
      setAllCorrect(false);
    }

    setShieldSavedAnswer(correctedByShield);

    if (answeredCorrectly || correctedByShield) {
      playCorrect();
    }

    if (correctedByShield) {
      setShieldActive(false);
    }

    setTimeout(() => {
      if (currentQuestion < knowledge.miniQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setInsightActive(false);
        setShieldSavedAnswer(false);
      } else {
        playSuccess();
        onComplete();
      }
    }, 1500);
  };

  const handleUseAbility = (abilityId: string) => {
    const success = activateAbility(abilityId);
    if (!success) return;
    playUiClick();

    if (abilityId === 'shield') {
      setShieldActive(true);
    }

    if (abilityId === 'multiplier') {
      setInsightActive(true);
    }

    if (abilityId === 'recharge') {
      setInsightActive(true);
    }

    if (abilityId === 'extratime') {
      setShieldActive(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!showResult && ['1', '2', '3', '4'].includes(event.key)) {
        const index = Number(event.key) - 1;
        if (question.options[index] !== undefined && !hiddenWrongIndexes.has(index)) {
          handleAnswer(index);
        }
      }

      const abilityMap: Record<string, string> = {
        q: 'shield',
        w: 'recharge',
        e: 'multiplier',
        r: 'extratime',
      };

      const abilityId = abilityMap[event.key.toLowerCase()];
      if (abilityId) {
        handleUseAbility(abilityId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showResult, question, hiddenWrongIndexes]);

  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat p-4 flex items-center justify-center" style={{ backgroundImage: "linear-gradient(rgba(120,53,15,0.55), rgba(146,64,14,0.45)), url(/assets/backgrounds/knowledge-room.png), url(/assets/backgrounds/knowledge-room.svg)" }}>
      <div className="max-w-lg w-full">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">📜</div>
          <h1 className="text-2xl font-bold" style={{ color: level.color }}>
            Sala del Conocimiento
          </h1>
          <p className="text-gray-600">{level.name}</p>
        </div>

        <div className="bg-amber-50 rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-b from-amber-100 to-amber-200 p-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-amber-900" style={{ fontFamily: 'serif' }}>
                {knowledge.title}
              </h2>
            </div>

            <div className="bg-white/80 rounded-2xl p-4 mb-6">
              <p className="text-gray-700 leading-relaxed text-sm">
                {knowledge.content}
              </p>
            </div>

            <div className="mt-6">
              <div className="text-center mb-4">
                <span className="text-sm font-medium text-amber-700">
                  Pregunta {currentQuestion + 1} de {knowledge.miniQuestions.length}
                </span>
              </div>

              <div className="bg-amber-200 rounded-2xl p-4">
                <h3 className="font-bold text-amber-900 mb-4 text-center">
                  {question.question}
                </h3>

                <div className="space-y-2">
                  {question.options.map((option, index) => {
                    if (hiddenWrongIndexes.has(index)) return null;

                    let buttonClass = 'w-full p-3 rounded-xl font-medium transition-all duration-200 ';

                    if (showResult) {
                      if (index === question.correctAnswer || (shieldSavedAnswer && index === selectedAnswer)) {
                        buttonClass += 'bg-green-500 text-white';
                      } else if (index === selectedAnswer) {
                        buttonClass += 'bg-red-400 text-white';
                      } else {
                        buttonClass += 'bg-white/50 text-gray-600';
                      }
                    } else {
                      buttonClass += 'bg-white hover:bg-amber-50 text-amber-900';
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        disabled={showResult}
                        className={buttonClass}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {showResult && (
                  <div className="mt-4 text-center">
                    {selectedAnswer === question.correctAnswer || shieldSavedAnswer ? (
                      <span className="text-green-600 font-bold">✅ ¡Correcto!</span>
                    ) : (
                      <span className="text-red-600 font-bold">
                        ❌ La respuesta era: {question.options[question.correctAnswer]}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-white rounded-2xl border border-amber-200 p-4 shadow-lg">
          <div className="mb-3">
            <ManaBar mana={state.mana} />
          </div>
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
          <p className="mt-2 text-center text-xs text-gray-500">Atajos: 1-4 para responder, Q/W/E/R para poderes</p>
        </div>

        <div className="text-center mt-6 text-gray-500 text-sm">
          {!showResult && (
            <p>Responde correctamente para continuar {allCorrect ? '✨' : ''}</p>
          )}
        </div>
      </div>
    </div>
  );
};
