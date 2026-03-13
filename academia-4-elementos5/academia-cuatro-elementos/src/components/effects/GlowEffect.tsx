import React from 'react';

export const GlowEffect: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute left-1/2 top-[22%] h-40 w-40 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute left-[18%] bottom-[18%] h-32 w-32 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="absolute right-[14%] bottom-[14%] h-36 w-36 rounded-full bg-amber-400/20 blur-3xl" />
    </div>
  );
};
