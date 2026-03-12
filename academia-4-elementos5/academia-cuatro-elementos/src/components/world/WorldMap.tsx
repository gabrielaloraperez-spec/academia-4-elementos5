import React from 'react';
import { GlowEffect } from '../effects/GlowEffect';
import { ParticleLayer } from '../effects/ParticleLayer';
import { KingdomNode, MapPosition } from './KingdomNode';
import { PathLine } from './PathLine';

interface WorldMapKingdom {
  kingdomId: number;
  unlocked: boolean;
  icon: string;
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
}

const WORLD_BACKGROUND =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='50%25' cy='40%25' r='65%25'%3E%3Cstop offset='0%25' stop-color='%231e293b'/%3E%3Cstop offset='100%25' stop-color='%23020617'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='1600' height='900' fill='url(%23g1)'/%3E%3Cpath d='M130 760 C290 640 350 610 520 640 C700 672 770 550 920 590 C1080 635 1200 520 1450 590 L1450 860 L130 860 Z' fill='%2316476b' opacity='0.22'/%3E%3Cpath d='M160 520 C320 430 470 460 630 520 C760 570 910 470 1100 520 C1240 560 1320 510 1460 540' stroke='%2338bdf8' stroke-width='8' stroke-linecap='round' opacity='0.18' fill='none'/%3E%3C/svg%3E\")";

export const WorldMap: React.FC<WorldMapProps> = ({ kingdoms, paths, onSelectKingdom, overlays }) => {
  const kingdomById = new Map(kingdoms.map((kingdom) => [kingdom.kingdomId, kingdom]));

  return (
    <div className="w-full flex justify-center px-2 md:px-4">
      <div className="relative w-full max-w-5xl aspect-[16/10] rounded-3xl overflow-hidden border border-white/15 bg-slate-950/70 shadow-2xl">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `${WORLD_BACKGROUND}, linear-gradient(to bottom, #020617, #1e1b4b, #0f172a)` }}
        />

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
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
