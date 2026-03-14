import React from 'react';
import { useGame } from '../context/useGame';
import { WorldMap } from '../components/world/WorldMap';
import { playUiClick } from '../utils/sound';

interface MapScreenProps {
  onArchiveSelect: () => void;
  onKingdomSelect: (levelId: number) => void;
  onBossSelect: () => void;
}

export const MapScreen: React.FC<MapScreenProps> = ({ onArchiveSelect, onKingdomSelect, onBossSelect }) => {
  const { state } = useGame();

  const archiveCompleted = state.unlockedLevels.length > 1 || state.knowledgeRoomsCompleted > 0;
  const fireUnlocked = archiveCompleted && state.unlockedLevels.includes(1);
  const airUnlocked = archiveCompleted && state.unlockedLevels.includes(2);
  const earthUnlocked = archiveCompleted && state.unlockedLevels.includes(3);
  const waterUnlocked = archiveCompleted && state.unlockedLevels.includes(4);
  const waterCompleted = archiveCompleted && state.unlockedLevels.includes(5);
  const bossUnlocked = waterCompleted && state.knowledgeRoomsCompleted >= 4;
  const MAP_BACKGROUND = '/assets/backgrounds/world-map.svg';

  const kingdoms = [
    { kingdomId: 0, title: 'Archivo de los Números', icon: '📚', position: { x: 50, y: 88 }, unlocked: true, completed: archiveCompleted },
    { kingdomId: 1, title: 'Reino de la Energía', icon: '🔥', position: { x: 46, y: 72 }, unlocked: fireUnlocked, completed: airUnlocked },
    { kingdomId: 2, title: 'Reino de la Defensa', icon: '🌬️', position: { x: 54, y: 58 }, unlocked: airUnlocked, completed: earthUnlocked },
    { kingdomId: 3, title: 'Reino de la Construcción', icon: '🌍', position: { x: 46, y: 44 }, unlocked: earthUnlocked, completed: waterUnlocked },
    { kingdomId: 4, title: 'Reino de la Distribución', icon: '🌊', position: { x: 54, y: 30 }, unlocked: waterUnlocked, completed: waterCompleted },
    { kingdomId: 5, title: 'Consejo Final', icon: '👑', position: { x: 50, y: 14 }, unlocked: bossUnlocked },
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
https://github.com/gabrielaloraperez-spec/academia-4-elementos5/pull/41/conflict?name=academia-4-elementos5%252Facademia-cuatro-elementos%252Fsrc%252Fpages%252FMapScreen.tsx&ancestor_oid=20ed163a111a4f9ad0acfe4de47d8510822cfaa0&base_oid=4ed2a1a4d24d6564e2163cb5595c1f126cec5da9&head_oid=0b19b3d82160bad1970de6be56dae02b645fb523
    if (kingdomId === 0) {
      onArchiveSelect();
      return;
    }

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
      style={{ backgroundImage: `url(${MAP_BACKGROUND})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-4 rounded-2xl border border-white/25 bg-slate-900/30 backdrop-blur-sm px-4 py-3 text-white flex items-center justify-between">
          <div>
            <h1 className="text-lg md:text-2xl font-extrabold">Mapa del mundo</h1>
            <p className="text-xs md:text-sm text-white/90">Archivo de los Números → Energía → Defensa → Construcción → Distribución → Consejo Final</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/80">Guardián</p>
            <p className="font-semibold">{state.playerName}</p>
          </div>
        </div>

        <WorldMap kingdoms={kingdoms} paths={paths} onSelectKingdom={handleSelect} backgroundImage={MAP_BACKGROUND} />
      </div>
    </div>
  );
};
