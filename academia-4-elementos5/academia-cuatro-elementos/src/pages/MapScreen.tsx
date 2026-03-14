import React from 'react';
import { useGame } from '../context/useGame';
import { KingdomNode, MapPosition } from '../components/world/KingdomNode';
import { PathLine } from '../components/world/PathLine';
import { playUiClick } from '../utils/sound';

interface MapScreenProps {
  onKingdomSelect: (levelId: number) => void;
  onBossSelect: () => void;
}

interface MapNode {
  id: number;
  title: string;
  icon: string;
  position: MapPosition;
  unlocked: boolean;
  completed?: boolean;
  onSelect: () => void;
}

export const MapScreen: React.FC<MapScreenProps> = ({ onKingdomSelect, onBossSelect }) => {
  const { state } = useGame();

  const fireUnlocked = state.unlockedLevels.includes(1);
  const airUnlocked = state.unlockedLevels.includes(2);
  const earthUnlocked = state.unlockedLevels.includes(3);
  const waterUnlocked = state.unlockedLevels.includes(4);
  const waterCompleted = state.unlockedLevels.includes(5);
  const bossUnlocked = waterCompleted && state.knowledgeRoomsCompleted >= 1;

  const mapNodes: MapNode[] = [
    {
      id: 0,
      title: 'Inicio',
      icon: '🚩',
      position: { x: 8, y: 70 },
      unlocked: true,
      onSelect: () => {},
    },
    {
      id: 1,
      title: 'Reino del Fuego',
      icon: '🔥',
      position: { x: 22, y: 70 },
      unlocked: fireUnlocked,
      completed: airUnlocked,
      onSelect: () => onKingdomSelect(1),
    },
    {
      id: 2,
      title: 'Reino del Aire',
      icon: '🌬️',
      position: { x: 36, y: 58 },
      unlocked: airUnlocked,
      completed: earthUnlocked,
      onSelect: () => onKingdomSelect(2),
    },
    {
      id: 3,
      title: 'Reino de la Tierra',
      icon: '🌍',
      position: { x: 52, y: 46 },
      unlocked: earthUnlocked,
      completed: waterUnlocked,
      onSelect: () => onKingdomSelect(3),
    },
    {
      id: 4,
      title: 'Reino del Agua',
      icon: '🌊',
      position: { x: 68, y: 36 },
      unlocked: waterUnlocked,
      completed: waterCompleted,
      onSelect: () => onKingdomSelect(4),
    },
    {
      id: 5,
      title: 'Torre del Tiempo',
      icon: '👑',
      position: { x: 92, y: 18 },
      unlocked: bossUnlocked,
      onSelect: onBossSelect,
    },
  ];

  const nodeById = new Map(mapNodes.map((node) => [node.id, node]));
  const paths = [
    { from: 0, to: 1, unlocked: fireUnlocked },
    { from: 1, to: 2, unlocked: airUnlocked },
    { from: 2, to: 3, unlocked: earthUnlocked },
    { from: 3, to: 4, unlocked: waterUnlocked },
    { from: 4, to: 5, unlocked: bossUnlocked },
  ];

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat px-3 py-6 md:p-8"
      style={{ backgroundImage: "url(/assets/backgrounds/world-map.png)", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-4 rounded-2xl border border-white/25 bg-slate-950/55 backdrop-blur px-4 py-3 text-white flex items-center justify-between">
          <div>
            <h1 className="text-lg md:text-2xl font-extrabold">Mapa del mundo</h1>
            <p className="text-xs md:text-sm text-white/80">Inicio → Fuego → Aire → Tierra → Agua → Torre del Tiempo</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/70">Guardían</p>
            <p className="font-semibold">{state.playerName}</p>
          </div>
        </div>

        <div className="relative mx-auto aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/20 bg-slate-900/45 backdrop-blur-sm shadow-2xl">
          <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            {paths.map((path) => {
              const from = nodeById.get(path.from);
              const to = nodeById.get(path.to);
              if (!from || !to) return null;

              return <PathLine key={`${path.from}-${path.to}`} from={from.position} to={to.position} unlocked={path.unlocked} />;
            })}
          </svg>

          <div className="absolute inset-0">
            {mapNodes.map((node) => (
              <KingdomNode
                key={node.id}
                kingdomId={node.id}
                unlocked={node.unlocked}
                icon={node.icon}
                position={node.position}
                title={node.title}
                completed={node.completed}
                onSelect={() => {
                  if (!node.unlocked) return;
                  playUiClick();
                  node.onSelect();
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
