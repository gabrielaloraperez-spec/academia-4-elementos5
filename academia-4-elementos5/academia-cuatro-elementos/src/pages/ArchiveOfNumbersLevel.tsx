import React, { useMemo, useState } from 'react';
import { ParticleLayer } from '../components/effects/ParticleLayer';
import { Hearts, ManaBar, ProgressBar, ScoreDisplay } from '../components/game/GameComponents';
import { useGame } from '../context/useGame';

interface ArchiveOfNumbersLevelProps {
  onComplete: () => void;
}

interface ExplanationStep {
  speaker: string;
  text: string;
}

interface Activity {
  question: string;
  options: string[];
  correctIndex: number;
  feedbackCorrect?: string;
  feedbackIncorrect?: string;
}

interface Section {
  key: 'symbols' | 'decimal' | 'ancient' | 'preparation';
  title: string;
  buttonLabel: string;
  explanationCards: ExplanationStep[];
  activities: Activity[];
}

const introDialogue: ExplanationStep[] = [
  {
    speaker: 'Numerius',
    text: 'Bienvenido, aprendiz. Antes de dominar los poderes de los cuatro reinos, debes comprender el lenguaje que sostiene el equilibrio del mundo: los números.',
  },
  {
    speaker: 'Numerius',
    text: 'Durante miles de años, diferentes civilizaciones crearon distintas formas de representar cantidades. A estas formas las llamamos sistemas numéricos.',
  },
  {
    speaker: 'Numerius',
    text: 'Hoy exploraremos algunos de los más importantes. Cuando los comprendas, estarás listo para comenzar tu viaje por los reinos matemáticos.',
  },
];

const sections: Section[] = [
  {
    key: 'symbols',
    title: 'Sala de los Símbolos',
    buttonLabel: 'Comenzar desafío',
    explanationCards: [
      { speaker: 'Numerius', text: 'Muchos pueblos antiguos necesitaban contar objetos, personas y alimentos. Para hacerlo inventaron símbolos para representar números.' },
      { speaker: 'Numerius', text: 'Los romanos usaban letras para escribir números. Por ejemplo: I = 1, V = 5, X = 10.' },
      { speaker: 'Numerius', text: 'Los mayas, en cambio, usaban puntos y barras. • representa 1 y — representa 5.' },
      { speaker: 'Numerius', text: 'Aunque los símbolos son diferentes, todos representan cantidades. Ahora veamos si puedes reconocer algunos de ellos.' },
    ],
    activities: [
      { question: '¿Qué número representa V en números romanos?', options: ['1', '5', '10', '50'], correctIndex: 1 },
      { question: '¿Qué número representa X?', options: ['5', '10', '15', '20'], correctIndex: 1 },
      { question: 'En el sistema maya: ••• ¿cuánto vale?', options: ['2', '3', '5', '8'], correctIndex: 1 },
      { question: '¿Qué sistema usa letras para representar números?', options: ['Maya', 'Romano', 'Decimal'], correctIndex: 1 },
    ],
  },
  {
    key: 'decimal',
    title: 'Taller del Sistema Decimal',
    buttonLabel: 'Practicar',
    explanationCards: [
      { speaker: 'Numerius', text: 'El sistema que usarás en los reinos es el sistema decimal.' },
      { speaker: 'Numerius', text: 'Se llama decimal porque está basado en 10 símbolos: 0 1 2 3 4 5 6 7 8 9.' },
      { speaker: 'Numerius', text: 'En este sistema, la posición del número cambia su valor.' },
      { speaker: 'Numerius', text: 'Observa el número 345: 3 está en las centenas, 4 en las decenas y 5 en las unidades.' },
      { speaker: 'Numerius', text: 'Comprender el valor de cada posición es fundamental para poder sumar, restar, multiplicar y dividir.' },
    ],
    activities: [
      { question: 'Número: 356. ¿Cuántas decenas hay?', options: ['3', '5', '6', '35'], correctIndex: 1 },
      { question: 'Número: 482. ¿Qué valor tiene el 8?', options: ['8', '80', '800', '8000'], correctIndex: 1 },
      { question: '3 centenas + 4 decenas + 2 unidades = ?', options: ['342', '324', '432', '243'], correctIndex: 0 },
      { question: '¿Cuántas centenas hay en 700?', options: ['7', '70', '700', '17'], correctIndex: 0 },
    ],
  },
  {
    key: 'ancient',
    title: 'El Reto de los Antiguos',
    buttonLabel: 'Resolver desafío',
    explanationCards: [
      { speaker: 'Numerius', text: 'Los romanos escribían números combinando letras.' },
      { speaker: 'Numerius', text: 'Cuando una letra con menor valor aparece después, se suma. Ejemplo: X + V = XV = 15.' },
      { speaker: 'Numerius', text: 'Estos números se usaban para construir monumentos, registrar años y organizar imperios.' },
      { speaker: 'Numerius', text: 'Lee con atención y responde las preguntas.' },
    ],
    activities: [
      { question: '¿Qué número representa XV?', options: ['10', '15', '20', '25'], correctIndex: 1 },
      { question: '¿Qué número representa XX?', options: ['10', '20', '30', '40'], correctIndex: 1 },
      { question: '¿Qué número representa V + I?', options: ['4', '5', '6', '7'], correctIndex: 2 },
    ],
  },
  {
    key: 'preparation',
    title: 'Preparación para los Reinos',
    buttonLabel: 'Último desafío',
    explanationCards: [
      { speaker: 'Numerius', text: 'Los números no solo se escriben. También se organizan y comparan.' },
      { speaker: 'Numerius', text: 'Cuando entiendes las posiciones y los valores, puedes saber cuál número es mayor o menor.' },
      { speaker: 'Numerius', text: 'Esta habilidad será muy importante cuando enfrentes los desafíos de los reinos.' },
      { speaker: 'Numerius', text: 'Demuestra que estás listo para continuar tu viaje.' },
    ],
    activities: [
      { question: '4 decenas + 3 unidades = ?', options: ['34', '43', '403', '430'], correctIndex: 1 },
      { question: '¿Cuál número es mayor?', options: ['389', '398'], correctIndex: 1 },
      { question: 'Ordena de menor a mayor: 45 — 32 — 58', options: ['45 → 58 → 32', '32 → 45 → 58', '58 → 45 → 32'], correctIndex: 1 },
      { question: '¿Cuántas unidades hay en 27?', options: ['2', '7', '27', '9'], correctIndex: 1 },
    ],
  },
];

type ArchivePhase = 'intro' | 'explanation' | 'quiz' | 'complete';

const DialogueAvatar: React.FC = () => (
  <div className="w-full md:w-72 md:flex-shrink-0">
    <div className="rounded-3xl border border-amber-100/60 bg-slate-900/70 p-4 shadow-[0_0_30px_rgba(250,204,21,0.2)]">
      <img
        src="https://raw.githubusercontent.com/gabrielaloraperez-spec/academia-4-elementos5/main/academia-4-elementos5/academia-cuatro-elementos/public/assets/backgrounds/guardian-archive.png"
        alt="Maestro Numerius"
        className="h-56 w-full rounded-2xl border border-amber-200/60 object-cover"
      />
      <p className="mt-3 text-center text-amber-100 font-bold">Maestro Numerius</p>
    </div>
  </div>
);

const ExplanationCard: React.FC<{
  title: string;
  step: ExplanationStep;
  stepNumber: number;
  totalSteps: number;
  buttonLabel: string;
  onNext: () => void;
}> = ({ title, step, stepNumber, totalSteps, buttonLabel, onNext }) => (
  <div className="animate-[fadeIn_.35s_ease] rounded-3xl border border-white/70 bg-white p-6 text-slate-800 shadow-2xl">
    <p className="text-xs font-bold tracking-wide uppercase">{title}</p>
    <p className="mt-2 text-sm font-semibold">{step.speaker}</p>
    <p className="mt-3 text-lg leading-relaxed">{step.text}</p>
    <div className="mt-5 flex items-center justify-between">
      <span className="text-xs font-semibold">Tarjeta {stepNumber} de {totalSteps}</span>
      <button type="button" onClick={onNext} className="rounded-xl bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-700">
        {buttonLabel}
      </button>
    </div>
  </div>
);

const QuizCard: React.FC<{
  sectionTitle: string;
  activity: Activity;
  activityNumber: number;
  totalActivities: number;
  selectedIndex: number | null;
  showFeedback: boolean;
  onSelect: (index: number) => void;
  onNext: () => void;
}> = ({ sectionTitle, activity, activityNumber, totalActivities, selectedIndex, showFeedback, onSelect, onNext }) => (
  <div className="animate-[fadeIn_.35s_ease] rounded-3xl border border-white/70 bg-white p-6 text-slate-800 shadow-2xl">
    <p className="text-xs font-bold tracking-wide uppercase">{sectionTitle}</p>
    <p className="mt-2 text-sm font-semibold">Pregunta {activityNumber} de {totalActivities}</p>
    <p className="mt-3 text-lg">{activity.question}</p>

    <div className="mt-4 grid gap-2">
      {activity.options.map((option, idx) => {
        const isCorrect = idx === activity.correctIndex;
        const isSelected = idx === selectedIndex;

        const stateClass = showFeedback
          ? isCorrect
            ? 'border-emerald-600 bg-emerald-100'
            : isSelected
              ? 'border-rose-600 bg-rose-100'
              : 'border-amber-700/30 bg-white/70'
          : 'border-amber-700/30 bg-white/70 hover:bg-white';

        return (
          <button
            key={`${option}-${idx}`}
            type="button"
            disabled={showFeedback}
            onClick={() => onSelect(idx)}
            className={`rounded-xl border px-4 py-3 text-left transition ${stateClass}`}
          >
            {option}
          </button>
        );
      })}
    </div>

    {showFeedback && (
      <p className="mt-4 font-semibold">
        {selectedIndex === activity.correctIndex ? activity.feedbackCorrect ?? '✅ ¡Respuesta correcta!' : activity.feedbackIncorrect ?? '❌ Respuesta incorrecta. ¡Sigue practicando!'}
      </p>
    )}

    <div className="mt-5 flex justify-end">
      <button
        type="button"
        onClick={onNext}
        disabled={!showFeedback}
        className={`rounded-xl px-4 py-2 font-semibold ${showFeedback ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-300 text-slate-500 cursor-not-allowed'}`}
      >
        Siguiente pregunta
      </button>
    </div>
  </div>
);

const SectionProgressBar: React.FC<{ sectionIndex: number; totalSections: number }> = ({ sectionIndex, totalSections }) => {
  const width = ((sectionIndex + 1) / totalSections) * 100;

  return (
    <div className="rounded-2xl bg-slate-900/55 border border-white/20 p-3 text-white">
      <div className="h-2 rounded-full bg-white/15 overflow-hidden">
        <div className="h-full rounded-full bg-cyan-300 transition-all duration-500" style={{ width: `${width}%` }} />
      </div>
      <p className="mt-2 text-xs">Sección {sectionIndex + 1} de {totalSections}</p>
    </div>
  );
};

const PowerBar: React.FC<{ power: number }> = ({ power }) => {
  const normalizedPower = Math.max(0, Math.min(100, power));

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs font-semibold mb-1.5 text-amber-200 uppercase tracking-wider">
        <span>Poder</span>
        <span>{Math.round(normalizedPower)}%</span>
      </div>
      <div className="w-full h-2.5 bg-amber-200/20 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300 bg-gradient-to-r from-amber-400 to-orange-500"
          style={{ width: `${normalizedPower}%` }}
        />
      </div>
    </div>
  );
};

export const ArchiveOfNumbersLevel: React.FC<ArchiveOfNumbersLevelProps> = ({ onComplete }) => {
  const { state } = useGame();
  const [phase, setPhase] = useState<ArchivePhase>('intro');
  const [introIndex, setIntroIndex] = useState(0);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [explanationIndex, setExplanationIndex] = useState(0);
  const [activityIndex, setActivityIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const section = sections[sectionIndex];
  const activity = section.activities[activityIndex];
  const totalQuestions = useMemo(() => sections.reduce((acc, currentSection) => acc + currentSection.activities.length, 0), []);

  const answeredQuestions = useMemo(() => {
    const completedSections = sections.slice(0, sectionIndex).reduce((acc, currentSection) => acc + currentSection.activities.length, 0);
    const currentAnswered = phase === 'quiz' ? activityIndex + (showFeedback ? 1 : 0) : 0;
    return Math.min(totalQuestions, completedSections + currentAnswered + (phase === 'complete' ? section.activities.length : 0));
  }, [sectionIndex, activityIndex, showFeedback, phase, section.activities.length, totalQuestions]);

  const powerPercent = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;

  const completionMessage = useMemo(
    () => 'Has aprendido el lenguaje de los números. Ahora estás listo para entrar al Reino de la Energía.',
    [],
  );

  const goToNextSection = () => {
    if (sectionIndex < sections.length - 1) {
      setSectionIndex((prev) => prev + 1);
      setExplanationIndex(0);
      setActivityIndex(0);
      setSelectedIndex(null);
      setShowFeedback(false);
      setPhase('explanation');
      return;
    }

    setPhase('complete');
  };

  const handleIntroNext = () => {
    if (introIndex < introDialogue.length - 1) {
      setIntroIndex((prev) => prev + 1);
      return;
    }

    setPhase('explanation');
  };

  const handleExplanationNext = () => {
    if (explanationIndex < section.explanationCards.length - 1) {
      setExplanationIndex((prev) => prev + 1);
      return;
    }

    setPhase('quiz');
  };

  const handleSelectAnswer = (index: number) => {
    if (showFeedback) return;
    setSelectedIndex(index);
    if (index === activity.correctIndex) {
      setCorrectCount((previous) => previous + 1);
    }
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (activityIndex < section.activities.length - 1) {
      setActivityIndex((prev) => prev + 1);
      setSelectedIndex(null);
      setShowFeedback(false);
      return;
    }

    goToNextSection();
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-cover bg-center animate-background-float" style={{ backgroundImage: 'url(/assets/backgrounds/knowledge-room.png), url(/assets/backgrounds/knowledge-room.svg)' }} />
      <div className="absolute inset-0 fog-layer" />
      <ParticleLayer variant="air" />

      <div className="relative z-10 w-full max-w-6xl">
        <div className="mb-4 rounded-2xl border border-white/20 bg-slate-900/55 backdrop-blur-sm p-4 text-white">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📚</span>
              <div>
                <p className="font-bold">Archivo de los Números</p>
                <p className="text-xs text-white/80">Entrenamiento inicial antes de los reinos</p>
              </div>
            </div>
            <ScoreDisplay score={state.score} streak={state.streak} />
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <ManaBar mana={state.mana} />
            <PowerBar power={powerPercent} />
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <Hearts lives={state.lives} />
            <ProgressBar current={Math.max(1, answeredQuestions)} total={Math.max(1, totalQuestions)} color="#38bdf8" />
          </div>
          <p className="mt-2 text-xs text-white/75">Aciertos: {correctCount}/{totalQuestions} · Respondidas: {answeredQuestions}/{totalQuestions}</p>
        </div>
        {phase !== 'intro' && phase !== 'complete' && (
          <div className="mb-4">
            <SectionProgressBar sectionIndex={sectionIndex} totalSections={sections.length} />
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 items-stretch">
          <DialogueAvatar />

          <div className="flex-1">
            {phase === 'intro' && (
              <ExplanationCard
                title="Introducción"
                step={introDialogue[introIndex]}
                stepNumber={introIndex + 1}
                totalSteps={introDialogue.length}
                buttonLabel={introIndex === introDialogue.length - 1 ? 'Comenzar entrenamiento' : 'Siguiente'}
                onNext={handleIntroNext}
              />
            )}

            {phase === 'explanation' && (
              <ExplanationCard
                title={section.title}
                step={section.explanationCards[explanationIndex]}
                stepNumber={explanationIndex + 1}
                totalSteps={section.explanationCards.length}
                buttonLabel={explanationIndex === section.explanationCards.length - 1 ? section.buttonLabel : 'Siguiente'}
                onNext={handleExplanationNext}
              />
            )}

            {phase === 'quiz' && (
              <QuizCard
                sectionTitle={section.title}
                activity={activity}
                activityNumber={activityIndex + 1}
                totalActivities={section.activities.length}
                selectedIndex={selectedIndex}
                showFeedback={showFeedback}
                onSelect={handleSelectAnswer}
                onNext={handleNextQuestion}
              />
            )}

            {phase === 'complete' && (
              <div className="animate-[fadeIn_.35s_ease] rounded-3xl border border-white/70 bg-white p-6 text-slate-800 shadow-2xl">
                <p className="text-sm font-semibold">Numerius</p>
                <p className="mt-3 text-2xl font-extrabold">Excelente trabajo, aprendiz.</p>
                <p className="mt-3 text-lg">{completionMessage}</p>
                <p className="mt-2 text-sm font-semibold">Precisión final: {Math.round(powerPercent)}%</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button type="button" onClick={onComplete} className="rounded-xl bg-emerald-700 px-6 py-3 text-emerald-50 font-bold hover:bg-emerald-600">
                    🔥 Entrar al Reino de la Energía
                  </button>
                  <button type="button" onClick={onComplete} className="rounded-xl bg-slate-800 px-6 py-3 text-slate-100 font-semibold hover:bg-slate-700">
                    Regresar al mapa
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
