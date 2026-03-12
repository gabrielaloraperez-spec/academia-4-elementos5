import React from 'react';

export interface MapPosition {
  x: number;
  y: number;
}

interface KingdomNodeProps {
  kingdomId: number;
  unlocked: boolean;
  icon: string;
  position: MapPosition;
  title: string;
  completed?: boolean;
  onSelect: (kingdomId: number) => void;
}

export const KingdomNode: React.FC<KingdomNodeProps> = ({
  kingdomId,
  unlocked,
  icon,
  position,
  title,
  completed = false,
  onSelect,
}) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(kingdomId)}
      disabled={!unlocked}
      className="absolute -translate-x-1/2 -translate-y-1/2 group"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      aria-label={`Entrar a ${title}`}
    >
      <div
        className={[
          'h-14 w-14 md:h-16 md:w-16 rounded-full border-2 flex items-center justify-center text-2xl md:text-3xl transition-all duration-300 shadow-xl',
          unlocked
            ? 'bg-slate-900/85 border-cyan-300/70 text-white group-hover:scale-110 group-hover:border-cyan-200'
            : 'bg-slate-800/85 border-slate-600 text-slate-400 opacity-70 cursor-not-allowed',
        ].join(' ')}
      >
        {unlocked ? icon : '🔒'}
      </div>

      <div className="mt-2 text-center">
        <p className={`text-xs font-semibold ${unlocked ? 'text-white' : 'text-white/55'}`}>{title}</p>
        {completed && <p className="text-[10px] text-emerald-300">Completado</p>}
      </div>
    </button>
  );
};
