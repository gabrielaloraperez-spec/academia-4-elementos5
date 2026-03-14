import React from 'react';

type ParticleVariant = 'fire' | 'air' | 'earth' | 'water';

interface ParticleLayerProps {
  variant?: ParticleVariant;
}

const PARTICLE_COLOR: Record<ParticleVariant, string> = {
  fire: 'bg-orange-300/70',
  air: 'bg-white/65',
  earth: 'bg-amber-200/55',
  water: 'bg-cyan-200/65',
};

export const ParticleLayer: React.FC<ParticleLayerProps> = ({ variant = 'air' }) => {
  const particles = [
    { left: '8%', top: '18%', delay: '0s', duration: '14s', driftX: '14px' },
    { left: '24%', top: '52%', delay: '1.2s', duration: '18s', driftX: '-10px' },
    { left: '38%', top: '28%', delay: '0.8s', duration: '16s', driftX: '8px' },
    { left: '54%', top: '62%', delay: '1.6s', duration: '19s', driftX: '-12px' },
    { left: '70%', top: '34%', delay: '2.2s', duration: '15s', driftX: '10px' },
    { left: '84%', top: '68%', delay: '0.4s', duration: '17s', driftX: '-8px' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle, index) => (
        <span
          key={index}
          className={`absolute h-1.5 w-1.5 rounded-full ${PARTICLE_COLOR[variant]} particle-drift`}
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
            ['--drift-x' as string]: particle.driftX,
          }}
        />
      ))}
    </div>
  );
};
