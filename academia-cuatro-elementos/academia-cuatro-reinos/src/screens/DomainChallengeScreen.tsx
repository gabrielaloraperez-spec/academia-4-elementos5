import React, { useEffect, useMemo, useState } from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
import React, { useMemo, useState, useEffect } from 'react';
=======
>>>>>>> 40cd229 (docs: add SublevelConfig name verification steps)
=======
>>>>>>> origin/codex/add-reto-de-dominio-level-with-exercises-gnecqo
import { Level, Problem } from '../data/gameData';

interface DomainChallengeScreenProps {
  level: Level | null;
  onComplete: () => void;
  onFail: () => void;
}

const TOTAL_TIME_SECONDS = 150;
const PASS_ACCURACY = 85;
<<<<<<< HEAD
<<<<<<< HEAD
}

const TOTAL_TIME_SECONDS = 150;

const shuffle = <T,>(items: T[]): T[] => {
=======
const MIN_ANSWERS_FOR_EARLY_PASS = 10;

function shuffle<T>(items: T[]): T[] {
>>>>>>> 40cd229 (docs: add SublevelConfig name verification steps)
=======
const MIN_ANSWERS_FOR_EARLY_PASS = 10;

function shuffle<T>(items: T[]): T[] {
>>>>>>> origin/codex/add-reto-de-dominio-level-with-exercises-gnecqo
  const cloned = [...items];
  for (let i = cloned.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
<<<<<<< HEAD
<<<<<<< HEAD
};

export const DomainChallengeScreen: React.FC<DomainChallengeScreenProps> = ({ level, onComplete, onFail }) => {
export const DomainChallengeScreen: React.FC<DomainChallengeScreenProps> = ({ level, onComplete }) => {
=======
}

export function DomainChallengeScreen({ level, onComplete, onFail }: DomainChallengeScreenProps) {
>>>>>>> 40cd229 (docs: add SublevelConfig name verification steps)
=======
}

export function DomainChallengeScreen({ level, onComplete, onFail }: DomainChallengeScreenProps) {
>>>>>>> origin/codex/add-reto-de-dominio-level-with-exercises-gnecqo
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME_SECONDS);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [result, setResult] = useState<'success' | 'failed' | null>(null);

  const mixedProblems = useMemo(() => {
    const source: Problem[] = level?.problems ?? [];
<<<<<<< HEAD
<<<<<<< HEAD

  const mixedProblems = useMemo(() => {
    const source: Problem[] = level?.problems ?? [];

=======
>>>>>>> 40cd229 (docs: add SublevelConfig name verification steps)
=======
>>>>>>> origin/codex/add-reto-de-dominio-level-with-exercises-gnecqo
    return shuffle(
      source.map((problem, index) => ({
        ...problem,
        id: index + 1,
      })),
    );
  }, [level]);

  const currentProblem = mixedProblems[currentProblemIndex];
  const progress = ((TOTAL_TIME_SECONDS - timeLeft) / TOTAL_TIME_SECONDS) * 100;
  const accuracy = answeredCount > 0 ? Math.round((correctAnswers / answeredCount) * 100) : 0;

  useEffect(() => {
    if (!started || timeLeft <= 0 || result !== null) return;

<<<<<<< HEAD
<<<<<<< HEAD
  useEffect(() => {
    if (!started || timeLeft <= 0) return;

=======
>>>>>>> 40cd229 (docs: add SublevelConfig name verification steps)
=======
>>>>>>> origin/codex/add-reto-de-dominio-level-with-exercises-gnecqo
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [started, timeLeft, result]);

  useEffect(() => {
    if (!started || result !== null) return;

<<<<<<< HEAD
<<<<<<< HEAD
    if (answeredCount >= 10 && accuracy >= PASS_ACCURACY) {
=======
    if (answeredCount >= MIN_ANSWERS_FOR_EARLY_PASS && accuracy >= PASS_ACCURACY) {
>>>>>>> 40cd229 (docs: add SublevelConfig name verification steps)
=======
    if (answeredCount >= MIN_ANSWERS_FOR_EARLY_PASS && accuracy >= PASS_ACCURACY) {
>>>>>>> origin/codex/add-reto-de-dominio-level-with-exercises-gnecqo
      setResult('success');
      return;
    }

    if (timeLeft === 0) {
      setResult(accuracy >= PASS_ACCURACY ? 'success' : 'failed');
    }
  }, [started, result, answeredCount, accuracy, timeLeft]);
<<<<<<< HEAD
<<<<<<< HEAD
  }, [started, timeLeft]);
=======
>>>>>>> 40cd229 (docs: add SublevelConfig name verification steps)
=======
>>>>>>> origin/codex/add-reto-de-dominio-level-with-exercises-gnecqo

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 40cd229 (docs: add SublevelConfig name verification steps)
=======
>>>>>>> origin/codex/add-reto-de-dominio-level-with-exercises-gnecqo
  if (!level || mixedProblems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-sky-900 to-indigo-950 flex items-center justify-center p-4">
        <div className="max-w-xl w-full bg-white rounded-3xl p-8 text-center">
          <p className="text-gray-700 mb-4">No se encontró información del nivel para el reto de dominio.</p>
          <button onClick={onFail} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold">
            Volver al reino
          </button>
<<<<<<< HEAD
<<<<<<< HEAD
          <button onClick={onComplete} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold">Continuar</button>
=======
>>>>>>> 40cd229 (docs: add SublevelConfig name verification steps)
=======
>>>>>>> origin/codex/add-reto-de-dominio-level-with-exercises-gnecqo
        </div>
      </div>
    );
  }

  const handleAnswer = (answer: number) => {
    if (!started || !currentProblem || feedback !== null || timeLeft <= 0 || result !== null) return;

    const isCorrect = answer === currentProblem.answer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setAnsweredCount((prev) => prev + 1);

<<<<<<< HEAD
<<<<<<< HEAD
    if (!started || !currentProblem || feedback !== null || timeLeft <= 0) return;

    const isCorrect = answer === currentProblem.answer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
=======
>>>>>>> 40cd229 (docs: add SublevelConfig name verification steps)
=======
>>>>>>> origin/codex/add-reto-de-dominio-level-with-exercises-gnecqo
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }

    setTimeout(() => {
      setFeedback(null);
      setCurrentProblemIndex((prev) => (prev + 1) % mixedProblems.length);
    }, 500);
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-sky-900 to-indigo-950 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="text-6xl mb-4">🌀</div>
          <h1 className="text-3xl font-bold text-indigo-700 mb-4">Reto de Dominio</h1>
          <p className="text-indigo-600 font-semibold mb-3">{level.name}</p>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
<<<<<<< HEAD
<<<<<<< HEAD
            Bienvenido al reto de dominio{`
`}Ya que te dominado los 3 niveles de este reino, ahora tendrás que demostrar tus habilidades contra reloj.{`

`}Si alcanzas 85% o más de respuestas correctas antes de acabar el tiempo, superarás el reto y pasarás a la sala del conocimiento. Con menos de 85%, deberás repetir el reino.
          {level && <p className="text-indigo-600 font-semibold mb-3">{level.name}</p>}
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            Bienvenido al reto de dominio{`\n`}Ya que te dominado los 3 niveles de este reino, ahora tendrás que demostrar tus habilidades contra reloj.{`\n\n`}En este reto se distribuyen aleatoriamente ejercicios misceláneos de este nivel con una barra de tiempo de 2 min 30 seg.
=======
            {'Bienvenido al reto de dominio\nYa que te dominado los 3 niveles de este reino, ahora tendrás que demostrar tus habilidades contra reloj.\n\nSi alcanzas 85% o más de respuestas correctas antes de acabar el tiempo, superarás el reto y pasarás a la sala del conocimiento. Con menos de 85%, deberás repetir el reino.'}
>>>>>>> 40cd229 (docs: add SublevelConfig name verification steps)
=======
            {'Bienvenido al reto de dominio\nYa que te dominado los 3 niveles de este reino, ahora tendrás que demostrar tus habilidades contra reloj.\n\nSi alcanzas 85% o más de respuestas correctas antes de acabar el tiempo, superarás el reto y pasarás a la sala del conocimiento. Con menos de 85%, deberás repetir el reino.'}
>>>>>>> origin/codex/add-reto-de-dominio-level-with-exercises-gnecqo
          </p>
          <button
            onClick={() => setStarted(true)}
            className="mt-6 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl"
          >
            Iniciar reto
          </button>
        </div>
      </div>
    );
  }

  if (result === 'success') {
<<<<<<< HEAD
<<<<<<< HEAD
  if (timeLeft <= 0) {
=======
>>>>>>> 40cd229 (docs: add SublevelConfig name verification steps)
=======
>>>>>>> origin/codex/add-reto-de-dominio-level-with-exercises-gnecqo
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-sky-900 to-indigo-950 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold text-indigo-700 mb-3">¡Reto superado!</h2>
          <p className="text-gray-700 mb-2">Precisión: <strong>{accuracy}%</strong> ({correctAnswers}/{answeredCount})</p>
<<<<<<< HEAD
<<<<<<< HEAD
          <h2 className="text-3xl font-bold text-indigo-700 mb-3">¡Reto completado!</h2>
          <p className="text-gray-700 mb-2">Respuestas correctas: <strong>{correctAnswers}</strong></p>
=======
>>>>>>> 40cd229 (docs: add SublevelConfig name verification steps)
=======
>>>>>>> origin/codex/add-reto-de-dominio-level-with-exercises-gnecqo
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            Felicitaciones, maestro de la suma, has dominado el primer elemento, Aire; ahora se abrirán las puertas de la sala del conocimiento.
          </p>
          <button
            onClick={onComplete}
            className="mt-6 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl"
          >
            Ir a la sala del conocimiento
          </button>
        </div>
      </div>
    );
  }

  if (result === 'failed') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-950 via-rose-900 to-red-950 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="text-6xl mb-4">💫</div>
          <h2 className="text-3xl font-bold text-red-700 mb-3">Reto no completado</h2>
          <p className="text-gray-700 mb-2">Precisión final: <strong>{accuracy}%</strong> ({correctAnswers}/{answeredCount})</p>
          <p className="text-gray-700">No alcanzaste el 85%. Debes repetir este reino para demostrar tu dominio.</p>
          <button
            onClick={onFail}
            className="mt-6 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl"
          >
            Repetir reino
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-sky-900 to-indigo-950 p-4">
      <div className="max-w-2xl mx-auto pt-4">
        <div className="bg-white/10 border border-white/20 rounded-2xl p-4 mb-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-lg">Reto de Dominio</h2>
            <span className="font-mono text-xl">⏳ {formatTime(timeLeft)}</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div className="h-full bg-amber-400 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs mt-2">Precisión actual: <strong>{accuracy}%</strong> · Correctas: {correctAnswers}/{answeredCount}</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl text-center">
          <p className="text-sm text-gray-500 mb-2">Ejercicio misceláneo #{currentProblemIndex + 1}</p>
          <div className="text-5xl font-bold text-gray-800 mb-8">{currentProblem?.question}</div>

          <div className="grid grid-cols-2 gap-4">
            {currentProblem?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={feedback !== null}
                className="py-4 rounded-xl text-xl font-bold bg-indigo-100 hover:bg-indigo-200 disabled:opacity-70"
              >
                {option}
              </button>
            ))}
          </div>

          {feedback && (
            <div className={`mt-4 font-bold ${feedback === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
              {feedback === 'correct' ? '¡Correcto!' : `Incorrecto. Era ${currentProblem?.answer}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
<<<<<<< HEAD
};
=======
}
>>>>>>> 40cd229 (docs: add SublevelConfig name verification steps)
=======
}
>>>>>>> origin/codex/add-reto-de-dominio-level-with-exercises-gnecqo
