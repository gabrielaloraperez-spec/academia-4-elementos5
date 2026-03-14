import React from 'react';

interface StoryCardProps {
  title: string;
  text: string;
  onClick: () => void;
  isVisible: boolean;
  isFinal?: boolean;
}

export const StoryCard: React.FC<StoryCardProps> = ({ title, text, onClick, isVisible, isFinal = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'w-full max-w-3xl rounded-3xl border border-amber-200/50 bg-[linear-gradient(135deg,rgba(251,243,209,0.78),rgba(255,247,226,0.72))] backdrop-blur-sm',
        'px-6 py-8 md:px-10 md:py-12 text-left transition-all duration-700 cursor-pointer',
        'hover:scale-[1.02] hover:border-amber-100/70 focus:outline-none focus:ring-2 focus:ring-amber-200/60',
        'story-card-glow',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none',
      ].join(' ')}
      aria-label={isFinal ? 'Comenzar viaje' : 'Continuar historia'}
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-amber-900 tracking-wide">{title}</h2>
      <p className="mt-4 text-base md:text-xl text-amber-950/90 whitespace-pre-line leading-relaxed">{text}</p>

      <div className="mt-8 text-sm md:text-base text-amber-800/80 font-semibold flex items-center justify-between">
        {isFinal ? <span>✨ El destino te espera</span> : <span>✨ Haz clic para continuar</span>}
        <span className="story-card-pulse">✦</span>
      </div>
    </button>
  );
};
