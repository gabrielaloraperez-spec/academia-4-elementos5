import React, { useMemo, useState } from 'react';
import type { WordProblem } from '../../utils/generateWordProblem';

interface WordProblemCardProps {
  title: string;
  problem: WordProblem;
  onSolved: () => void;
}

export const WordProblemCard: React.FC<WordProblemCardProps> = ({ title, problem, onSolved }) => {
  const [value, setValue] = useState('');
  const [isSolved, setIsSolved] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const feedbackText = useMemo(() => {
    if (feedback === 'correct') return '✅ ¡Correcto! El equilibrio de este nivel fue restaurado.';
    if (feedback === 'incorrect') return '❌ Respuesta incorrecta. Intenta de nuevo.';
    return '';
  }, [feedback]);

  const handleVerify = () => {
    if (isSolved) return;
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
      setFeedback('incorrect');
      return;
    }

    if (parsed === problem.answer) {
      setFeedback('correct');
      setIsSolved(true);
      onSolved();
      return;
    }

    setFeedback('incorrect');
  };

  return (
    <article className="rounded-2xl border border-indigo-200 bg-white/95 p-5 shadow-xl">
      <h3 className="text-xl font-bold text-indigo-700">{title}</h3>
      <p className="mt-3 text-gray-700 leading-relaxed">{problem.story}</p>

      <div className="mt-4 flex flex-col gap-3">
        <input
          type="number"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          disabled={isSolved}
          className="w-full rounded-xl border border-indigo-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:bg-gray-100"
          placeholder="Escribe tu respuesta"
        />
        <button
          type="button"
          onClick={handleVerify}
          disabled={isSolved}
          className="rounded-xl bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-700 disabled:bg-emerald-600"
        >
          {isSolved ? 'Equilibrio restaurado' : 'Verificar'}
        </button>
      </div>

      {feedback && <p className={`mt-3 text-sm font-semibold ${feedback === 'correct' ? 'text-emerald-600' : 'text-red-600'}`}>{feedbackText}</p>}
    </article>
  );
};
