import React from 'react';
import { GlowEffect } from '../effects/GlowEffect';
import { ParticleLayer } from '../effects/ParticleLayer';
import { KingdomNode, MapPosition } from './KingdomNode';
import { PathLine } from './PathLine';

interface WorldMapKingdom {
  kingdomId: number;
  unlocked: boolean;
  icon: string;
  nodeImageUrl?: string;
  position: MapPosition;
  title: string;
  completed?: boolean;
}

interface WorldMapPath {
  from: number;
  to: number;
  unlocked: boolean;
}

interface WorldMapProps {
  kingdoms: WorldMapKingdom[];
  paths: WorldMapPath[];
  onSelectKingdom: (kingdomId: number) => void;
  overlays?: React.ReactNode;
  backgroundImage?: string;
}

export const WorldMap: React.FC<WorldMapProps> = ({
  kingdoms,
  paths,
  onSelectKingdom,
  overlays,
  backgroundImage = '/assets/backgrounds/world-map.svg',
}) => {
  const kingdomById = new Map(kingdoms.map((kingdom) => [kingdom.kingdomId, kingdom]));

  return (
    <div className="w-full flex justify-center px-2 md:px-4">
      <div className="relative w-full max-w-5xl aspect-[10/14] md:aspect-[16/10] rounded-3xl overflow-hidden border border-white/20 bg-slate-950/50">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `linear-gradient(rgba(2,6,23,0.15), rgba(15,23,42,0.2)), url(${backgroundImage})` }}
        />

        <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          {paths.map((path) => {
            const from = kingdomById.get(path.from);
            const to = kingdomById.get(path.to);
            if (!from || !to) return null;
            return <PathLine key={`${path.from}-${path.to}`} from={from.position} to={to.position} unlocked={path.unlocked} />;
          })}
        </svg>

        <div className="absolute inset-0">
          {kingdoms.map((kingdom) => (
            <KingdomNode
              key={kingdom.kingdomId}
              kingdomId={kingdom.kingdomId}
              unlocked={kingdom.unlocked}
              icon={kingdom.icon}
              nodeImageUrl={kingdom.nodeImageUrl}
              position={kingdom.position}
              title={kingdom.title}
              completed={kingdom.completed}
              onSelect={onSelectKingdom}
            />
          ))}
        </div>

        <ParticleLayer />
        <GlowEffect />

        {overlays && <div className="absolute inset-0 pointer-events-none">{overlays}</div>}
      </div>
    </div>
  );
};
