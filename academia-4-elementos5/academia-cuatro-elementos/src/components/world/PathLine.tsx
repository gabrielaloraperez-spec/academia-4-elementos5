import React from 'react';
import { MapPosition } from './KingdomNode';

interface PathLineProps {
  from: MapPosition;
  to: MapPosition;
  unlocked: boolean;
}

export const PathLine: React.FC<PathLineProps> = ({ from, to, unlocked }) => {
  const glow = unlocked ? 'drop-shadow(0 0 6px rgba(34,211,238,0.9))' : 'none';

  return (
    <line
      x1={`${from.x}%`}
      y1={`${from.y}%`}
      x2={`${to.x}%`}
      y2={`${to.y}%`}
      stroke={unlocked ? 'rgba(103,232,249,0.95)' : 'rgba(148,163,184,0.35)'}
      strokeWidth="4"
      strokeLinecap="round"
      strokeDasharray={unlocked ? '0' : '6 8'}
      style={{ filter: glow }}
    />
  );
};
