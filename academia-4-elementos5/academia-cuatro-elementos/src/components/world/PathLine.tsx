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
        <image
          href="https://raw.githubusercontent.com/gabrielaloraperez-spec/academia-4-elementos5/main/academia-4-elementos5/academia-cuatro-elementos/public/assets/backgrounds/path-glow.png"
          x={`${midX - 1.5}%`}
          y={`${midY - 1.5}%`}
          width="3%"
          height="3%"
          className="animate-path-flow"
        />
      )}
    </g>
  );
};
