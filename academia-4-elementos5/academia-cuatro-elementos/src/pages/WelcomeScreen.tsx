import React, { useEffect, useMemo, useState } from 'react';
import { useGame } from '../context/useGame';

const AVATARS = ['🧙', '🧝', '🧛', '🧚', '🦸', '🦹', '🧑‍🚀', '🐉'];

type IntroStep = 'cover' | 'story' | 'profile';

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
    if (!name.trim()) {
      return 'Guardián';
    }
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
          setStep('story');
        } else if (step === 'story') {
          setStep('profile');
        } else {
          handleStart();
        }
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
      <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4" style={{ backgroundImage: "linear-gradient(rgba(2,6,23,0.35), rgba(30,41,59,0.4)), url(/assets/backgrounds/WelcomeBG.png), url(/assets/backgrounds/welcome-bg.png), url(/assets/backgrounds/welcome-bg.svg)" }}>
        <div className="w-full max-w-3xl text-center">
          <div className="mx-auto mb-8 h-44 w-44 rounded-full border border-cyan-300/40 bg-gradient-to-br from-red-500/20 via-sky-500/20 to-emerald-400/20 shadow-[0_0_80px_rgba(56,189,248,0.3)] flex items-center justify-center overflow-hidden">
            <img src="/assets/icons/icon-192.png" alt="Academia de los Cuatro Elementos" className="h-28 w-28 object-contain" />
          </div>


          <h1 className="text-4xl md:text-6xl font-black text-white tracking-wide leading-tight">
            ACADEMIA DE LOS CUATRO ELEMENTOS
          </h1>

          <p className="mt-5 text-lg md:text-xl text-cyan-100 max-w-2xl mx-auto">
            “El equilibrio del mundo depende de quienes entienden el poder de los números.”
          </p>

          <button
            onClick={() => setStep('story')}
            className="mt-10 px-10 py-4 rounded-2xl text-lg font-bold text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            Comenzar
          </button>
        </div>
      </div>
    );
  }

  if (step === 'story') {
    return (
      <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4" style={{ backgroundImage: "linear-gradient(rgba(30,27,75,0.4), rgba(49,46,129,0.45)), url(/assets/backgrounds/WelcomeBG.png), url(/assets/backgrounds/welcome-bg.png), url(/assets/backgrounds/welcome-bg.svg)" }}>
        <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 md:p-10 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-8">
            Crónica de la Academia
          </h2>

          <div className="space-y-4">
            {storyBlocks.map((block, index) => (
              <div key={index} className="bg-black/20 rounded-2xl p-4 md:p-5 border border-white/10">
                <p className="text-cyan-50 whitespace-pre-line leading-relaxed">{block}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => setStep('profile')}
              className="px-10 py-4 rounded-2xl text-lg font-bold text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              Elegir mi Avatar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4" style={{ backgroundImage: "linear-gradient(rgba(49,46,129,0.4), rgba(88,28,135,0.45)), url(/assets/backgrounds/WelcomeBG.png), url(/assets/backgrounds/welcome-bg.png), url(/assets/backgrounds/welcome-bg.svg)" }}>
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'serif' }}>
            Academia de los
          </h1>
          <h1 className="text-4xl md:text-5xl font-bold text-amber-400" style={{ fontFamily: 'serif' }}>
            Cuatro Elementos
          </h1>
          <div className="text-6xl mt-4">{selectedAvatar}</div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-2xl">
          <h2 className="text-xl font-bold text-gray-800 text-center mb-6">
            ⚔️ Tu iniciación final, {guardianLabel} ⚔️
          </h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ¿Cómo te llamas?
            </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Elige tu avatar
            </label>
            <div className="grid grid-cols-4 gap-3">
              {AVATARS.map((avatar) => (
                <button
                  key={avatar}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`
                    text-4xl p-3 rounded-xl transition-all duration-200
                    ${selectedAvatar === avatar
                      ? 'bg-indigo-100 border-4 border-indigo-500 scale-110'
                      : 'bg-gray-50 border-2 border-gray-200 hover:border-indigo-300'
                    }
                  `}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleStart}
            disabled={!name.trim()}
            className={`
              w-full py-4 rounded-xl text-xl font-bold text-white transition-all duration-300
              ${name.trim()
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 hover:scale-105 shadow-lg'
                : 'bg-gray-300 cursor-not-allowed'
              }
            `}
          >
            🎮 Iniciar aventura
          </button>
        </div>
      </div>
    </div>
  );
};
