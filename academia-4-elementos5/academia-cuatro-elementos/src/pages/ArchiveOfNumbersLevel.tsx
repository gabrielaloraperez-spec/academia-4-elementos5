import React, { useMemo, useState } from 'react';
import { ParticleLayer } from '../components/effects/ParticleLayer';

interface ArchiveOfNumbersLevelProps {
  onComplete: () => void;
}

interface Activity {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

interface Section {
  id: number;
  title: string;
  intro: string;
  explanation: string;
  activities: Activity[];
}

const sections: Section[] = [
  {
    id: 1,
    title: 'Sala de Símbolos',
    intro: 'Antes de dominar los reinos elementales, debes reconocer cómo distintas civilizaciones escribían los números.',
    explanation: 'Sistema romano: usa letras (I, V, X...). Sistema maya: usa puntos (• = 1) y barras (— = 5).',
    activities: [
      {
        question: 'Relaciona el símbolo romano para el número 5',
        options: ['X', 'I', 'V', 'L'],
        correctIndex: 2,
        explanation: 'En números romanos, V representa 5.',
      },
      {
        question: 'En el sistema maya, una barra (—) representa:',
        options: ['1', '5', '10', '50'],
        correctIndex: 1,
      },
      {
        question: '¿Qué sistema usa letras para representar números?',
        options: ['Maya', 'Romano', 'Decimal', 'Binario'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 2,
    title: 'Taller Decimal',
    intro: 'Ahora aprenderás el valor posicional: centenas, decenas y unidades.',
    explanation: 'Ejemplo: 356 = 3 centenas, 5 decenas, 6 unidades.',
    activities: [
      {
        question: 'En el número 356, ¿cuántas decenas hay?',
        options: ['3', '5', '6', '35'],
        correctIndex: 1,
      },
      {
        question: 'En el número 482, el valor del 8 es:',
        options: ['8', '80', '800', '0.8'],
        correctIndex: 1,
      },
      {
        question: '3 centenas + 2 decenas + 5 unidades =',
        options: ['352', '235', '325', '523'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 3,
    title: 'Desafío Ancestral',
    intro: 'Lee con atención: en números romanos, X vale 10 y V vale 5. Se suman cuando van en orden descendente.',
    explanation: 'Ejemplo: XV = 10 + 5 = 15. XX = 10 + 10 = 20.',
    activities: [
      {
        question: 'XV equivale a:',
        options: ['14', '15', '16', '25'],
        correctIndex: 1,
      },
      {
        question: 'XX equivale a:',
        options: ['10', '15', '20', '30'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 4,
    title: 'Preparación para los Reinos',
    intro: 'Última prueba. Demuestra que dominas el sistema decimal para entrar a los reinos matemáticos.',
    explanation: 'Compara, ordena y construye números con decenas y unidades.',
    activities: [
      {
        question: '4 decenas + 3 unidades =',
        options: ['34', '43', '403', '7'],
        correctIndex: 1,
      },
      {
        question: '¿Cuál es mayor?',
        options: ['389', '398', 'Son iguales', 'No se puede saber'],
        correctIndex: 1,
      },
      {
        question: 'Orden ascendente correcto:',
        options: ['58, 45, 32', '45, 32, 58', '32, 45, 58', '32, 58, 45'],
        correctIndex: 2,
      },
    ],
  },
];

export const ArchiveOfNumbersLevel: React.FC<ArchiveOfNumbersLevelProps> = ({ onComplete }) => {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [activityIndex, setActivityIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const section = sections[sectionIndex];
  const activity = section.activities[activityIndex];
  const progress = useMemo(() => {
    const total = sections.reduce((acc, s) => acc + s.activities.length, 0);
    const done = sections.slice(0, sectionIndex).reduce((acc, s) => acc + s.activities.length, 0) + activityIndex;
    return Math.round((done / total) * 100);
  }, [sectionIndex, activityIndex]);

  const handleAnswer = (index: number) => {
    if (showFeedback) return;
    setSelectedIndex(index);
    setShowFeedback(true);
    if (index === activity.correctIndex) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleContinue = () => {
    if (activityIndex < section.activities.length - 1) {
      setActivityIndex((prev) => prev + 1);
    } else if (sectionIndex < sections.length - 1) {
      setSectionIndex((prev) => prev + 1);
      setActivityIndex(0);
    }

    setSelectedIndex(null);
    setShowFeedback(false);
  };

  const isFinished = sectionIndex === sections.length - 1 && activityIndex === section.activities.length - 1 && showFeedback;

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-cover bg-center animate-background-float" style={{ backgroundImage: 'url(/assets/backgrounds/knowledge-room.png)' }} />
      <div className="absolute inset-0 fog-layer" />
      <ParticleLayer variant="air" />

      <div className="relative z-10 w-full max-w-4xl bg-slate-900/55 border border-white/20 rounded-3xl p-5 md:p-8 text-white backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-4">
          <div
            className="h-16 w-16 rounded-full border border-amber-200/60 bg-center bg-cover flex items-center justify-center text-3xl"
            style={{ backgroundImage: 'url(/assets/backgrounds/guardian-archive.png)' }}
            aria-label="Maestro Numerius"
          >
            📚
          </div>
          <div>
            <p className="text-amber-200 font-semibold">Maestro Numerius</p>
            <p className="text-white/90 text-sm">"Antes de dominar los reinos elementales, debes entender el lenguaje de los números."</p>
          </div>
        </div>

        <div className="mb-5">
          <div className="h-2 w-full bg-white/15 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-300 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs mt-2 text-white/80">Progreso del Archivo: {progress}%</p>
        </div>

        <div className="rounded-2xl bg-white/10 border border-white/15 p-4 md:p-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-cyan-100">Archivo de los Números · {section.title}</h1>
          <p className="mt-2 text-white/90">{section.intro}</p>
          <p className="mt-2 text-cyan-100/90 text-sm md:text-base">{section.explanation}</p>

          <div className="mt-6 rounded-xl bg-slate-950/35 p-4 border border-white/15">
            <p className="font-semibold mb-3">Actividad {activityIndex + 1}:</p>
            <p className="text-lg mb-4">{activity.question}</p>

            <div className="grid gap-2">
              {activity.options.map((option, idx) => {
                const isCorrect = idx === activity.correctIndex;
                const isSelected = idx === selectedIndex;
                const stateClass = showFeedback
                  ? isCorrect
                    ? 'bg-emerald-500/30 border-emerald-300'
                    : isSelected
                      ? 'bg-rose-500/30 border-rose-300'
                      : 'bg-white/5 border-white/10'
                  : 'bg-white/5 border-white/20 hover:bg-white/10';

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleAnswer(idx)}
                    disabled={showFeedback}
                    className={`text-left px-4 py-3 rounded-xl border transition-all ${stateClass}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <div className="mt-4">
                <p className="font-semibold text-cyan-100">
                  {selectedIndex === activity.correctIndex ? '✅ ¡Excelente!' : '💡 Casi, sigue practicando.'}
                </p>
                {activity.explanation && <p className="text-sm text-white/85 mt-1">{activity.explanation}</p>}
              </div>
            )}
          </div>
        </div>

        {!isFinished && (
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={handleContinue}
              disabled={!showFeedback}
              className={`px-6 py-3 rounded-xl font-semibold ${showFeedback ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-slate-600 cursor-not-allowed'}`}
            >
              Continuar
            </button>
          </div>
        )}

        {isFinished && (
          <div className="mt-6 rounded-2xl bg-emerald-500/15 border border-emerald-300/30 p-5 text-center">
            <p className="text-xl font-bold text-emerald-100">Excelente trabajo, aprendiz.</p>
            <p className="text-emerald-50/90 mt-2">Ya estás listo para entrar al Reino de la Energía.</p>
            <p className="text-sm text-white/80 mt-2">Aciertos: {correctCount}</p>
            <button
              type="button"
              onClick={onComplete}
              className="mt-4 px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold"
            >
              Regresar al mapa
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
