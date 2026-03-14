import React, { useEffect, useMemo, useState } from 'react';
import { ParticleLayer } from '../components/effects/ParticleLayer';
import { StoryCard } from '../components/ui/StoryCard';
import { useGame } from '../context/useGame';

const AVATARS = ['🧙', '🧝', '🧛', '🧚', '🦸', '🦹', '🧑‍🚀', '🐉'];

type IntroStep = 'cover' | 'profile' | 'story';

const storyCards = [
  {
    title: 'El equilibrio del mundo',
    text: 'Desde el inicio de los tiempos, los cuatro elementos han moldeado el mundo.',
  },
  {
    title: 'Conocimiento ancestral',
    text: 'Los antiguos sabios descubrieron un secreto: el equilibrio de los elementos se guía con matemáticas.',
  },
  {
    title: 'El primer poder',
    text: '🔥 Fuego, origen de todo, dio vida a la Suma — el poder de crear y hacer crecer.',
  },
  {
    title: 'El segundo poder',
    text: '🌬 Aire, símbolo de movimiento y equilibrio, dio vida a la Resta — el arte de restaurar la armonía.',
  },
  {
    title: 'El tercer poder',
    text: '🌱 Tierra, madre y proveedora, dio vida a la Multiplicación — el poder de la expansión.',
  },
  {
    title: 'El cuarto poder',
    text: '💧 Agua, flujo que da forma, dio vida a la División — el poder de la precisión y la distribución.',
  },
  {
    title: 'La Torre del Tiempo',
    text: 'Cuando los elementos entraron en conflicto, los antiguos construyeron la Torre del Tiempo para proteger el equilibrio del mundo.',
  },
  {
    title: 'Los cuatro reinos',
    text: 'Solo quienes dominen los cuatro reinos matemáticos podrán entrar en la torre y revelar sus secretos.',
  },
  {
    title: 'Tu travesía',
    text: 'Hoy comienza tu entrenamiento. En cada reino, un maestro pondrá a prueba tu conocimiento.',
  },
  {
    title: 'El destino',
    text: 'Si triunfas, te convertirás en un Guardián del Equilibrio.',
  },
]

export const WelcomeScreen: React.FC = () => {
  const { setPlayerInfo, state } = useGame();
  const [step, setStep] = useState<IntroStep>('cover');
  const [name, setName] = useState(state.playerName);
  const [selectedAvatar, setSelectedAvatar] = useState(state.avatar || AVATARS[0]);
  const [currentStoryCard, setCurrentStoryCard] = useState(0);

  const guardianLabel = useMemo(() => {
    if (!name.trim()) return 'Guardián';
    return name.trim();
  }, [name]);

  const handleStart = () => {
    if (name.trim()) {
      setPlayerInfo(name.trim(), selectedAvatar);
    }
  };

  const handleStoryAdvance = () => {
    if (currentStoryCard < storyCards.length - 1) {
      setCurrentStoryCard((prev) => prev + 1);
      return;
    }

    handleStart();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        if (step === 'cover') {
          setStep('profile');
          return;
        }

        if (step === 'profile') {
          if (name.trim()) {
            setStep('story');
          }
          return;
        }

        handleStoryAdvance();
      }

      if (step === 'profile' && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
        event.preventDefault();
        const delta = event.key === 'ArrowRight' ? 1 : -1;
        const currentIndex = AVATARS.indexOf(selectedAvatar);
        const nextIndex = (currentIndex + delta + AVATARS.length) % AVATARS.length;
        setSelectedAvatar(AVATARS[nextIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, selectedAvatar, name, currentStoryCard]);

  if (step === 'cover') {
    return (
      <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-end justify-center p-4 md:p-8" style={{ backgroundImage: 'url(/assets/backgrounds/welcome-bg.png)' }}>
        <div className="w-full max-w-2xl text-center rounded-3xl border border-white/30 bg-slate-900/45 backdrop-blur-md p-6 md:p-8">
          <p className="text-cyan-100 text-base md:text-lg leading-relaxed">
            El equilibrio del mundo depende de quienes entienden el poder de los números.
          </p>

          <button
            onClick={() => setStep('profile')}
            className="mt-6 px-10 py-4 rounded-2xl text-lg font-bold text-white bg-white/20 hover:bg-white/30 border border-white/40 transition-all duration-300"
          >
            Comenzar aventura
          </button>
        </div>
      </div>
    );
  }

  if (step === 'profile') {
    return (
      <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4" style={{ backgroundImage: 'url(/assets/backgrounds/welcome-bg.png)' }}>
        <div className="max-w-md w-full">
          <div className="text-center mb-6">
            <div className="text-6xl mt-2">{selectedAvatar}</div>
          </div>

          <div className="bg-white/92 backdrop-blur rounded-3xl p-6 border border-white/60">
            <h2 className="text-xl font-bold text-gray-800 text-center mb-6">
              ⚔️ Tu iniciación final, {guardianLabel} ⚔️
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">¿Cómo te llamas?</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Escribe tu nombre..."
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-lg"
                maxLength={20}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Elige tu avatar</label>
              <div className="grid grid-cols-4 gap-3">
                {AVATARS.map((avatar) => (
                  <button
                    key={avatar}
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`text-4xl p-3 rounded-xl transition-all duration-200 ${selectedAvatar === avatar
                      ? 'bg-indigo-100 border-4 border-indigo-500 scale-110'
                      : 'bg-gray-50 border-2 border-gray-200 hover:border-indigo-300'
                      }`}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep('story')}
              disabled={!name.trim()}
              className={`w-full py-4 rounded-xl text-xl font-bold text-white transition-all duration-300 ${name.trim()
                ? 'bg-slate-800 hover:bg-slate-900'
                : 'bg-gray-300 cursor-not-allowed'
                }`}
            >
              Continuar historia
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentCard = storyCards[currentStoryCard];
  const isFinalCard = currentStoryCard === storyCards.length - 1;

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-background-float" style={{ backgroundImage: 'url(/assets/backgrounds/welcome-bg.png)' }} />
      <div className="absolute inset-0 fog-layer" />
      <ParticleLayer variant="air" />

      <div className="relative z-10 w-full flex flex-col items-center gap-6">
        <StoryCard
          key={currentStoryCard}
          title={currentCard.title}
          text={currentCard.text}
          onClick={handleStoryAdvance}
          isVisible={true}
          isFinal={isFinalCard}
        />

        {isFinalCard && (
          <button
            type="button"
            onClick={handleStart}
            className="px-10 py-4 rounded-2xl text-lg md:text-xl font-bold text-white bg-indigo-700/85 hover:bg-indigo-600 transition-all duration-300 border border-indigo-200/40"
          >
            Comenzar tu viaje
          </button>
        )}
      </div>
    </div>
  );
};
