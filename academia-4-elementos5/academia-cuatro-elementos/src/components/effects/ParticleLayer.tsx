import React from 'react';

export const ParticleLayer: React.FC = () => {
  const particles = [
    { left: '12%', top: '18%', delay: '0s' },
    { left: '28%', top: '42%', delay: '0.8s' },
    { left: '45%', top: '24%', delay: '1.6s' },
    { left: '63%', top: '62%', delay: '0.4s' },
    { left: '78%', top: '33%', delay: '1.2s' },
    { left: '86%', top: '70%', delay: '2s' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((particle, index) => (
        <span
          key={index}
          className="absolute h-1.5 w-1.5 rounded-full bg-cyan-200/80 animate-float-air"
          style={{ left: particle.left, top: particle.top, animationDelay: particle.delay }}
        />
      ))}
    </div>
  );
};
