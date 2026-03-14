import React, { useEffect, useMemo, useState } from 'react';
import { ParticleLayer } from '../components/effects/ParticleLayer';
import { StoryCard } from '../components/ui/StoryCard';
import { useGame } from '../context/useGame';

const AVATARS = ['🧙', '🧝', '🧛', '🧚', '🦸', '🦹', '🧑‍🚀', '🐉'];

type IntroStep = 'cover' | 'profile' | 'story';

const storyCards = [
  {
    title: 'The Balance of the World',
    text: 'Since the beginning of time, the four elements have shaped the world.',
  },
  {
    title: 'Ancient Knowledge',
    text: 'The ancient sages discovered a secret: the balance of the elements is guided by mathematics.',
  },
  {
    title: 'The First Power',
    text: '🔥 Fire, origin of all things, gave birth to Addition — the power to create and grow.',
  },
  {
    title: 'The Second Power',
    text: '🌬 Air, symbol of movement and balance, gave birth to Subtraction — the art of restoring equilibrium.',
  },
  {
    title: 'The Third Power',
    text: '🌱 Earth, mother and provider, gave birth to Multiplication — the power of expansion.',
  },
  {
    title: 'The Fourth Power',
    text: '💧 Water, the shaping flow, gave birth to Division — the power of precision and distribution.',
  },
  {
    title: 'The Tower of Time',
    text: 'When the elements fell into conflict, the ancients built the Tower of Time to protect the balance of the world.',
  },
  {
    title: 'The Four Realms',
    text: 'Only those who master the four mathematical realms may enter the tower and uncover its secrets.',
  },
  {
    title: 'Your Journey',
    text: 'Today your training begins. In each realm, a master will test your knowledge.',
  },
  {
    title: 'The Destiny',
    text: 'If you succeed, you will become a Guardian of Balance.',
  },
];

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
      <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4" style={{ backgroundImage: 'url(/assets/backgrounds/story-bg.png), url(/assets/backgrounds/story-bg.svg)' }}>
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
              Continue
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
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-background-float" style={{ backgroundImage: 'url(/assets/backgrounds/story-bg.png), url(/assets/backgrounds/story-bg.svg)' }} />
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
            Begin Your Journey
          </button>
        )}
      </div>
    </div>
  );
};
