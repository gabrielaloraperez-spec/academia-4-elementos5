import React, { useEffect, useMemo, useState } from 'react';
import { Level, Problem } from '../data/gameData';
import { playCorrect, playSuccess, playUiClick, playWrong } from '../utils/sound';
import { getKingdomTheme, withSvgFallback } from '../styles/kingdomThemes';

interface DomainChallengeScreenProps {
  level: Level | null;
  onComplete: () => void;
  onFail: () => void;
}

const TOTAL_TIME_SECONDS = 150;
const PASS_ACCURACY = 85;
const MIN_ANSWERS_FOR_EARLY_PASS = 10;

function shuffle<T>(items: T[]): T[] {
  const cloned = [...items];
  for (let i = cloned.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
}

export const DomainChallengeScreen: React.FC<DomainChallengeScreenProps> = ({ level, onComplete, onFail }) => {
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME_SECONDS);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [result, setResult] = useState<'success' | 'failed' | null>(null);

  const mixedProblems = useMemo(() => {
    const source: Problem[] = level?.problems ?? [];
    return shuffle(
      source.map((problem, index) => ({
        ...problem,
        id: index + 1,
      })),
    );
  }, [level]);

  const currentProblem = mixedProblems[currentProblemIndex];
  const challengeTheme = level ? getKingdomTheme(level.operation) : null;
  const progress = ((TOTAL_TIME_SECONDS - timeLeft) / TOTAL_TIME_SECONDS) * 100;
  const accuracy = answeredCount > 0 ? Math.round((correctAnswers / answeredCount) * 100) : 0;

  useEffect(() => {
    if (!started || timeLeft <= 0 || result !== null) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [started, timeLeft, result]);

  useEffect(() => {
    if (!started || result !== null) return;

    if (answeredCount >= MIN_ANSWERS_FOR_EARLY_PASS && accuracy >= PASS_ACCURACY) {
      setResult('success');
      return;
    }

    if (timeLeft === 0) {
      setResult(accuracy >= PASS_ACCURACY ? 'success' : 'failed');
    }
  }, [started, result, answeredCount, accuracy, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (answer: number) => {
    if (!started || !currentProblem || feedback !== null || timeLeft <= 0 || result !== null) return;

    const isCorrect = answer === currentProblem.answer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setAnsweredCount((prev) => prev + 1);

    if (isCorrect) {
      playCorrect();
      setCorrectAnswers((prev) => prev + 1);
    } else {
      playWrong();
    }

    setTimeout(() => {
      setFeedback(null);
      setCurrentProblemIndex((prev) => (prev + 1) % mixedProblems.length);
    }, 500);
  };


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!started && event.key === 'Enter') {
        setStarted(true);
        return;
      }

      if (result === 'success' && event.key === 'Enter') {
        onComplete();
        return;
      }

      if (result === 'failed' && event.key === 'Enter') {
        onFail();
        return;
      }

      if (started && result === null && feedback === null && ['1', '2', '3', '4'].includes(event.key)) {
        const index = Number(event.key) - 1;
        const option = currentProblem?.options[index];
        if (option !== undefined) {
          handleAnswer(option);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [started, result, feedback, currentProblem]);

  if (!level || mixedProblems.length === 0) {
    return (
      <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4" style={{ backgroundImage: `linear-gradient(rgba(30,41,59,0.68), rgba(30,41,59,0.52)), ${withSvgFallback(challengeTheme?.background ?? '/assets/backgrounds/world-map.svg')}` }}>
        <div className="max-w-xl w-full bg-white rounded-3xl p-8 text-center">
          <p className="text-gray-700 mb-4">No se encontró información del nivel para el reto de dominio.</p>
          <button onClick={onFail} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold">
            Volver al reino
          </button>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4" style={{ backgroundImage: `linear-gradient(rgba(30,41,59,0.68), rgba(30,41,59,0.52)), ${withSvgFallback(challengeTheme?.background ?? '/assets/backgrounds/world-map.svg')}` }}>
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="text-6xl mb-4">🌀</div>
          <h1 className="text-3xl font-bold text-indigo-700 mb-4">Reto de Dominio</h1>
          <p className="text-indigo-600 font-semibold mb-3">{level.name}</p>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            {
              'Bienvenido al reto de dominio\nYa que te dominado los 3 niveles de este reino, ahora tendrás que demostrar tus habilidades contra reloj.\n\nSi alcanzas 85% o más de respuestas correctas antes de acabar el tiempo, superarás el reto y pasarás a la sala del conocimiento. Con menos de 85%, deberás repetir el reino.'
            }
          </p>
          <button
            onClick={() => { playUiClick(); setStarted(true); }}
            className="mt-6 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl"
          >
            Iniciar reto
          </button>
        </div>
      </div>
    );
  }

  if (result === 'success') {
    return (
      <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4" style={{ backgroundImage: `linear-gradient(rgba(30,41,59,0.68), rgba(30,41,59,0.52)), ${withSvgFallback(challengeTheme?.background ?? '/assets/backgrounds/world-map.svg')}` }}>
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold text-indigo-700 mb-3">¡Reto superado!</h2>
          <p className="text-gray-700 text-lg mb-6">
            Precisión final: <span className="font-bold text-indigo-700">{accuracy}%</span>
          </p>
          <button
            onClick={onComplete}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl"
          >
            Entrar a la sala del conocimiento
          </button>
        </div>
      </div>
    );
  }

  if (result === 'failed') {
    return (
      <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4" style={{ backgroundImage: `linear-gradient(rgba(30,41,59,0.68), rgba(30,41,59,0.52)), ${withSvgFallback(challengeTheme?.background ?? '/assets/backgrounds/world-map.svg')}` }}>
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="text-6xl mb-4">💥</div>
          <h2 className="text-3xl font-bold text-red-600 mb-3">No alcanzaste el dominio</h2>
          <p className="text-gray-700 text-lg mb-2">
            Precisión final: <span className="font-bold text-red-600">{accuracy}%</span>
          </p>
          <p className="text-gray-600 mb-6">Necesitas 85% o más para avanzar. ¡Inténtalo de nuevo!</p>
          <button onClick={onFail} className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl">
            Repetir reino
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat p-4" style={{ backgroundImage: `linear-gradient(rgba(30,41,59,0.68), rgba(30,41,59,0.52)), ${withSvgFallback(challengeTheme?.background ?? '/assets/backgrounds/world-map.svg')}` }}>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl p-6 shadow-xl mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-indigo-700">{level.name}</h2>
            <span className="text-lg font-mono font-bold text-indigo-700">⏱️ {formatTime(timeLeft)}</span>
          </div>

          <div className="w-full bg-indigo-100 rounded-full h-3 mb-3">
            <div
              className="h-3 rounded-full bg-indigo-600 transition-all duration-1000"
              style={{ width: `${Math.max(0, 100 - progress)}%` }}
            />
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span>Respondidas: {answeredCount}</span>
            <span>Precisión: {accuracy}%</span>
            <span>Meta: {PASS_ACCURACY}%</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl text-center">
          <p className="text-gray-500 mb-2">Pregunta {currentProblemIndex + 1}</p>
          <div className="text-5xl font-bold text-gray-800 mb-8">{currentProblem?.question}</div>

          <div className="grid grid-cols-2 gap-4">
            {currentProblem?.options.map((option, index) => {
              const feedbackColor =
                feedback === null
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : option === currentProblem.answer
                    ? 'bg-green-600'
                    : 'bg-red-600';

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={feedback !== null}
                  className={`py-4 rounded-xl text-white text-xl font-bold transition ${feedbackColor}`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
