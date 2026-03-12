import React from 'react';

interface GameOverScreenProps {
  score: number;
  onRetry: () => void;
  onMenu: () => void;
  isBoss?: boolean;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  score,
  onRetry,
  onMenu,
  isBoss = false
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-red-900 via-purple-900 to-slate-900">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl p-8 text-center shadow-2xl">
          {/* Icon */}
          <div className="text-6xl mb-4">💀</div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            {isBoss ? '¡Tiempo Agotado!' : '¡Has Perdido!'}
          </h2>

          <p className="text-gray-600 mb-6">
            {isBoss
              ? 'El tiempo se acabó en la Torre del Tiempo'
              : 'Te has quedado sin vidas'
            }
          </p>

          {/* Score */}
          <div className="bg-amber-50 rounded-xl p-4 mb-6">
            <div className="text-gray-500 text-sm">Puntuación</div>
            <div className="text-amber-600 font-bold text-2xl">
              {score.toLocaleString()}
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={onRetry}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-lg hover:scale-105 transition-transform"
            >
              🔄 Reintentar
            </button>
            <button
              onClick={onMenu}
              className="w-full py-4 rounded-xl bg-gray-200 text-gray-700 font-bold text-lg hover:bg-gray-300 transition-colors"
            >
              🏠 Volver al Menú
            </button>
          </div>
        </div>

        {/* Encouragement */}
        <div className="text-center mt-6 text-white/70">
          <p>¡No te rindas! La práctica lleva a la maestría.</p>
        </div>
      </div>
    </div>
  );
};
