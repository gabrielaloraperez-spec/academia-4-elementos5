import React from 'react';
import { kingdomThemes } from '../../theme/kingdomThemes';

interface TimeTowerProps {
  progress: number;
  bossUnlocked: boolean;
  onBossSelect: () => void;
}

export const TimeTower: React.FC<TimeTowerProps> = ({ progress, bossUnlocked, onBossSelect }) => {
  const theme = kingdomThemes.time;
  const percentage = Math.max(0, Math.min(100, Math.round(progress)));

  return (
    <button
      onClick={onBossSelect}
      disabled={!bossUnlocked}
      className={`
        group w-full rounded-2xl border p-4 transition-all duration-300
        bg-gradient-to-b ${theme.cardGradient} ${theme.cardBorder}
        ${bossUnlocked ? `${theme.cardGlow} hover:scale-[1.02]` : 'opacity-60 cursor-not-allowed'}
      `}
    >
      <div className="flex items-center gap-4">
        <div className={`relative h-32 w-14 overflow-hidden rounded-xl bg-purple-950/80 ${theme.towerGlow}`}>
          <div
            className={`absolute bottom-0 w-full bg-gradient-to-t ${theme.towerFill} animate-pulse-time transition-all duration-700`}
            style={{ height: `${percentage}%` }}
          />
          <div className="absolute top-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white/80 animate-float-air" />
          <div className="absolute top-8 right-4 h-1 w-1 rounded-full bg-white/60 animate-float-air" />
          <div className="absolute top-14 left-4 h-1 w-1 rounded-full bg-yellow-200/80 animate-bounce-slow" />
        </div>

        <div className="flex-1 text-left">
          <h3 className={`font-bold text-lg ${theme.textPrimary}`}>{theme.kingdomName}</h3>
          <p className={`text-xs ${theme.textSecondary}`}>Progreso global del estudiante</p>
          <p className="mt-2 text-sm text-yellow-200">Avance total: {percentage}%</p>
          <p className="text-xs text-purple-100/85 mt-1">
            {bossUnlocked ? 'El desafío final está disponible.' : 'Completa los cuatro reinos para desbloquearla.'}
          </p>
        </div>

        <div className="text-2xl text-yellow-300 group-hover:animate-pulse-time">{bossUnlocked ? '👑' : '🔒'}</div>
      </div>
    </button>
  );
};
