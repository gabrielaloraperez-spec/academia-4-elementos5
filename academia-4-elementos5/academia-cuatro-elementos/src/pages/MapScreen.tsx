import React from 'react';
import { useGame } from '../context/useGame';
import { WorldMap } from '../components/world/WorldMap';
import { playUiClick } from '../utils/sound';

interface MapScreenProps {
  onKingdomSelect: (levelId: number) => void;
  onBossSelect: () => void;
}

export const MapScreen: React.FC<MapScreenProps> = ({ onKingdomSelect, onBossSelect }) => {
  const { state } = useGame();

  const fireUnlocked = state.unlockedLevels.includes(1);
  const airUnlocked = state.unlockedLevels.includes(2);
  const earthUnlocked = state.unlockedLevels.includes(3);
  const waterUnlocked = state.unlockedLevels.includes(4);
  const waterCompleted = state.unlockedLevels.includes(5);
  const bossUnlocked = waterCompleted && state.knowledgeRoomsCompleted >= 1;

  const ASSET_BASE = 'https://raw.githubusercontent.com/gabrielaloraperez-spec/academia-4-elementos5/main/academia-4-elementos5/academia-cuatro-elementos/public/assets/backgrounds';

  const kingdoms = [
    { kingdomId: 0, title: 'Inicio', icon: '🚩', position: { x: 50, y: 88 }, unlocked: true, completed: fireUnlocked },
    { kingdomId: 1, title: 'Reino del Fuego', icon: '🔥', nodeImageUrl: `${ASSET_BASE}/node-fire.png`, position: { x: 46, y: 72 }, unlocked: fireUnlocked, completed: airUnlocked },
    { kingdomId: 2, title: 'Reino del Aire', icon: '🌬️', nodeImageUrl: `${ASSET_BASE}/node-air.png`, position: { x: 54, y: 58 }, unlocked: airUnlocked, completed: earthUnlocked },
    { kingdomId: 3, title: 'Reino de la Tierra', icon: '🌍', nodeImageUrl: `${ASSET_BASE}/node-earth.png`, position: { x: 46, y: 44 }, unlocked: earthUnlocked, completed: waterUnlocked },
    { kingdomId: 4, title: 'Reino del Agua', icon: '🌊', nodeImageUrl: `${ASSET_BASE}/node-water.png`, position: { x: 54, y: 30 }, unlocked: waterUnlocked, completed: waterCompleted },
    { kingdomId: 5, title: 'Torre del Tiempo', icon: '👑', nodeImageUrl: `${ASSET_BASE}/node-timetower.png`, position: { x: 50, y: 14 }, unlocked: bossUnlocked },
  ];

  const paths = [
    { from: 0, to: 1, unlocked: fireUnlocked },
    { from: 1, to: 2, unlocked: airUnlocked },
    { from: 2, to: 3, unlocked: earthUnlocked },
    { from: 3, to: 4, unlocked: waterUnlocked },
    { from: 4, to: 5, unlocked: bossUnlocked },
  ];

  const handleSelect = (kingdomId: number) => {
    const selected = kingdoms.find((node) => node.kingdomId === kingdomId);
    if (!selected || !selected.unlocked) return;

    playUiClick();

    if (kingdomId >= 1 && kingdomId <= 4) {
      onKingdomSelect(kingdomId);
      return;
    }

    if (kingdomId === 5) {
      onBossSelect();
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat px-3 py-6 md:p-8"
      style={{ backgroundImage: `url(${ASSET_BASE}/world-map.png)`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-4 rounded-2xl border border-white/25 bg-slate-900/30 backdrop-blur-sm px-4 py-3 text-white flex items-center justify-between">
          <div>
            <h1 className="text-lg md:text-2xl font-extrabold">Mapa del mundo</h1>
            <p className="text-xs md:text-sm text-white/90">Inicio → Fuego → Aire → Tierra → Agua → Torre del Tiempo</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/80">Guardián</p>
            <p className="font-semibold">{state.playerName}</p>
          </div>
        </div>

        <WorldMap kingdoms={kingdoms} paths={paths} onSelectKingdom={handleSelect} backgroundImage={`${ASSET_BASE}/world-map.png`} />
      </div>
    </div>
  );
};
