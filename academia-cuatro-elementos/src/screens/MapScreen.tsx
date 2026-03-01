import React, { useEffect, useMemo, useState } from 'react';
import { useGame } from '../context/useGame';
import { levels, achievements as allAchievements } from '../data/gameData';
import { KingdomCard } from '../components/kingdom/KingdomCard';
import { TimeTower } from '../components/kingdom/TimeTower';

interface MapScreenProps {
  onLevelSelect: (levelId: number) => void;
  onBossSelect: () => void;
}

const achievementStyleByOperation: Record<string, { bg: string; text: string; ring: string; animation: string }> = {
  addition: { bg: 'bg-red-500/20', text: 'text-red-200', ring: 'ring-red-300/40', animation: 'animate-pulse' },
  subtraction: { bg: 'bg-cyan-500/20', text: 'text-cyan-200', ring: 'ring-cyan-300/40', animation: 'animate-bounce' },
  multiplication: { bg: 'bg-emerald-500/20', text: 'text-emerald-200', ring: 'ring-emerald-300/40', animation: 'animate-pulse' },
  division: { bg: 'bg-blue-500/20', text: 'text-blue-200', ring: 'ring-blue-300/40', animation: 'animate-bounce' },
  time: { bg: 'bg-violet-500/20', text: 'text-violet-200', ring: 'ring-violet-300/40', animation: 'animate-pulse' },
};

const resolveAchievementOperation = (id: string): string => {
  if (id.includes('addition')) return 'addition';
  if (id.includes('subtraction')) return 'subtraction';
  if (id.includes('multiplication')) return 'multiplication';
  if (id.includes('division')) return 'division';
  if (id.includes('boss') || id.includes('speed')) return 'time';
  if (id.includes('first') || id.includes('perfect') || id.includes('streak_5')) return 'addition';
  if (id.includes('streak_10')) return 'subtraction';
  if (id.includes('all_knowledge')) return 'multiplication';
  return 'division';
};

export const MapScreen: React.FC<MapScreenProps> = ({ onLevelSelect, onBossSelect }) => {
  const { state } = useGame();
  const [showAchievements, setShowAchievements] = useState(false);

  const bossUnlocked = state.unlockedLevels.includes(5);
  const completedLevels = levels.filter((level) => state.unlockedLevels.includes(level.id + 1)).length;
  const towerProgress = (completedLevels / levels.length) * 100;

  const unlockedAchievements = useMemo(
    () => allAchievements.filter((achievement) => state.achievements.includes(achievement.id)),
    [state.achievements],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (['1', '2', '3', '4'].includes(key)) {
        const levelId = Number(key);
        if (state.unlockedLevels.includes(levelId)) {
          onLevelSelect(levelId);
        }
      }

      if (key === 'b' && bossUnlocked) {
        onBossSelect();
      }

      if (key === 'l') {
        setShowAchievements((prev) => !prev);
      }

      if (key === 'escape') {
        setShowAchievements(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.unlockedLevels, bossUnlocked, onLevelSelect, onBossSelect]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-violet-950 to-slate-900 p-4">
      <div className="max-w-md mx-auto mb-6 relative">
        <div className="bg-white/10 backdrop-blur rounded-2xl p-4 flex items-center justify-between border border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{state.avatar}</span>
            <div>
              <div className="text-white font-bold">{state.playerName}</div>
              <div className="text-amber-400 text-sm">{state.score.toLocaleString()} pts</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right text-white">
              <div className="text-xs">Nivel</div>
              <div className="font-bold">{Math.max(1, state.unlockedLevels.length)}</div>
            </div>
            <button
              type="button"
              onClick={() => setShowAchievements((prev) => !prev)}
              className="h-10 w-10 rounded-xl bg-amber-400/20 border border-amber-300/40 text-amber-200 hover:bg-amber-400/30"
              aria-label="Ver logros"
            >
              🏅
            </button>
          </div>
        </div>

        {showAchievements && (
          <div className="absolute right-0 mt-2 w-full rounded-2xl border border-white/20 bg-slate-900/95 backdrop-blur-xl p-3 shadow-2xl z-20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-bold">Logros</h3>
              <span className="text-white/70 text-xs">{unlockedAchievements.length}/{allAchievements.length}</span>
            </div>
            <div className="max-h-64 overflow-auto space-y-2 pr-1">
              {unlockedAchievements.length === 0 && (
                <p className="text-white/60 text-sm">Aún no has desbloqueado logros.</p>
              )}
              {unlockedAchievements.map((achievement) => {
                const operation = resolveAchievementOperation(achievement.id);
                const style = achievementStyleByOperation[operation] ?? achievementStyleByOperation.time;
                return (
                  <div
                    key={achievement.id}
                    className={`rounded-xl p-3 ring-1 ${style.bg} ${style.text} ${style.ring} ${style.animation}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{achievement.icon}</span>
                      <div>
                        <p className="font-semibold text-sm">{achievement.name}</p>
                        <p className="text-xs opacity-90">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'serif' }}>
          🗺️ Los Cuatro Reinos Matemáticos
        </h1>
        <p className="text-white/70 text-sm mt-1">Explora cada reino elemental y fortalece tu poder numérico</p>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        {levels.map((level) => (
          <KingdomCard
            key={level.id}
            level={level}
            unlocked={state.unlockedLevels.includes(level.id)}
            completed={state.unlockedLevels.includes(level.id + 1)}
            highScore={state.highScores[level.id]}
            onSelect={() => onLevelSelect(level.id)}
          />
        ))}

        <TimeTower progress={towerProgress} bossUnlocked={bossUnlocked} onBossSelect={onBossSelect} />
      </div>

      <div className="max-w-md mx-auto mt-8 text-center text-white/60 text-xs">
        <p>Atajos: [1-4] reinos, [B] jefe final, [L] logros.</p>
      </div>
    </div>
  );
};
