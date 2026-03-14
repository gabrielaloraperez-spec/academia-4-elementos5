import React, { useEffect, useMemo, useState } from 'react';
import { useGame } from '../context/useGame';

const AVATARS = ['🧙', '🧝', '🧛', '🧚', '🦸', '🦹', '🧑‍🚀', '🐉'];

type IntroStep = 'cover' | 'profile' | 'story';

const storyBlocks = [
  'Hace mucho tiempo, los números eran simples símbolos. Hasta que alguien descubrió que podían moldear la realidad.',
  'La Suma dio origen a la creación.\nLa Resta enseñó el arte del equilibrio.\nLa Multiplicación expandió el poder.\nLa División reveló la precisión.',
  'Pero en el centro de todo se alza la Torre del Tiempo. Solo quienes dominen los cuatro reinos podrán desafiarla.',
  'Hoy comienza tu entrenamiento.\nNo estarás solo.\nTu avatar será tu compañero en este viaje.',
  '¿Estás listo para convertirte en Guardián del Equilibrio?'
];

export const WelcomeScreen: React.FC = () => {
  const { setPlayerInfo, state } = useGame();
  const [step, setStep] = useState<IntroStep>('cover');
  const [name, setName] = useState(state.playerName);
  const [selectedAvatar, setSelectedAvatar] = useState(state.avatar || AVATARS[0]);

  const guardianLabel = useMemo(() => {
    if (!name.trim()) return 'Guardián';
    return name.trim();
  }, [name]);

  const handleStart = () => {
    if (name.trim()) {
      setPlayerInfo(name.trim(), selectedAvatar);
    }
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

        handleStart();
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
  }, [step, selectedAvatar, name]);

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
      <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4" style={{ backgroundImage: 'url(https://raw.githubusercontent.com/gabrielaloraperez-spec/academia-4-elementos5/main/academia-4-elementos5/academia-cuatro-elementos/public/assets/backgrounds/story-bg.png)' }}>
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

  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4" style={{ backgroundImage: 'url(https://raw.githubusercontent.com/gabrielaloraperez-spec/academia-4-elementos5/main/academia-4-elementos5/academia-cuatro-elementos/public/assets/backgrounds/story-bg.png)' }}>
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 md:p-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-8">Crónica de la Academia</h2>

        <div className="space-y-4">
          {storyBlocks.map((block, index) => (
            <div key={index} className="bg-black/20 rounded-2xl p-4 md:p-5 border border-white/10">
              <p className="text-cyan-50 whitespace-pre-line leading-relaxed">{block}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={handleStart}
            className="px-10 py-4 rounded-2xl text-lg font-bold text-white bg-white/20 hover:bg-white/30 border border-white/40 transition-all duration-300"
          >
            🎮 Iniciar aventura
          </button>
        </div>
      </div>
    </div>
  );
};
