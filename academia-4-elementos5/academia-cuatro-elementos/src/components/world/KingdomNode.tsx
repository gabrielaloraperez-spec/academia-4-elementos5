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
    <div
      className="absolute z-10 pointer-events-auto"
      style={{ left: `${position.x}%`, top: `${position.y}%`, transform: 'translate(-50%, -50%)' }}
    >
      <button
        type="button"
        onClick={() => onSelect(kingdomId)}
        disabled={!unlocked}
        className="group h-16 w-16 touch-manipulation disabled:cursor-not-allowed md:h-20 md:w-20"
        aria-label={`Entrar a ${title}`}
      >
        <div
          className={[
            'h-full w-full rounded-full border-2 flex items-center justify-center text-2xl md:text-3xl transition-all duration-300 shadow-xl animate-float-air',
            unlocked
              ? 'bg-slate-900/85 border-cyan-300/90 text-white ring-4 ring-cyan-300/30 animate-pulse-glow group-hover:scale-110 group-hover:border-cyan-100'
              : 'bg-slate-700/85 border-slate-500 text-slate-300 grayscale opacity-70',
          ].join(' ')}
          style={{ animationDelay: `${kingdomId * 0.15}s` }}
        >
          {unlocked ? icon : '🔒'}
        </div>
      </button>

      <div className="pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 text-center whitespace-nowrap">
        <p className={`text-xs font-semibold ${unlocked ? 'text-white' : 'text-white/55'}`}>{title}</p>
        {completed && <p className="text-[10px] text-emerald-300">Completado</p>}
      </div>
    </div>
  );
};
