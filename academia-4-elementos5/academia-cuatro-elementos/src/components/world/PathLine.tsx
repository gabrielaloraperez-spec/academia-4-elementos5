import React from 'react';
import { MapPosition } from './KingdomNode';

interface PathLineProps {
  from: MapPosition;
  to: MapPosition;
  unlocked: boolean;
}

export const PathLine: React.FC<PathLineProps> = ({ from, to, unlocked }) => {
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;

  return (
    <g>
      <line
        x1={`${from.x}%`}
        y1={`${from.y}%`}
        x2={`${to.x}%`}
        y2={`${to.y}%`}
        stroke={unlocked ? 'rgba(110, 231, 255, 0.95)' : 'rgba(148,163,184,0.3)'}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={unlocked ? '0' : '6 8'}
      />

      {unlocked && (
        <circle
          cx={`${midX}%`}
          cy={`${midY}%`}
          r="1.8"
          fill="rgba(110, 231, 255, 0.9)"
          className="animate-path-flow"
        />
      )}
    </g>
  );
};
