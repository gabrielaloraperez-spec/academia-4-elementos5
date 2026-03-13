import React from 'react';
import { MapPosition } from './KingdomNode';

interface PathLineProps {
  from: MapPosition;
  to: MapPosition;
  unlocked: boolean;
}

export const PathLine: React.FC<PathLineProps> = ({ from, to, unlocked }) => {
  return (
    <line
      x1={`${from.x}%`}
      y1={`${from.y}%`}
      x2={`${to.x}%`}
      y2={`${to.y}%`}
      stroke={unlocked ? 'rgba(125,211,252,0.9)' : 'rgba(148,163,184,0.35)'}
      strokeWidth="4"
      strokeLinecap="round"
      strokeDasharray={unlocked ? '0' : '6 8'}
    />
  );
};
