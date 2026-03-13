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
      className="absolute -translate-x-1/2 -translate-y-1/2 group pointer-events-auto"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      aria-label={`Entrar a ${title}`}
    >
      <div
        className={[
          'h-14 w-14 md:h-16 md:w-16 rounded-full border-2 flex items-center justify-center text-2xl md:text-3xl transition-all duration-300 shadow-xl',
          unlocked
            ? 'bg-slate-900/90 border-cyan-300/80 text-white animate-float-air ring-4 ring-cyan-300/30 group-hover:scale-110 group-hover:border-cyan-200 group-hover:ring-cyan-200/50'
            : 'bg-slate-700/90 border-slate-500 text-slate-300 grayscale opacity-80 cursor-not-allowed',
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
