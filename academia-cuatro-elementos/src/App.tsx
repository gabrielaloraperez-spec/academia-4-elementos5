import React, { useState, useEffect, useMemo } from 'react';
import { GameProvider } from './context/GameContext';
import { useGame } from './context/useGame';
import {
  WelcomeScreen,
  MapScreen,
  LevelScreen,
  KnowledgeRoom,
  BossScreen,
  GameOverScreen,
  DomainChallengeScreen
} from './screens';
import { levels } from './data/gameData';
import {
  loadAppSessionFromIndexedDb,
  loadGameStateFromIndexedDb,
  saveAppSessionToIndexedDb,
  AppSessionState,
} from './lib/persistence';
import {
  getAuthSession,
  isCloudSyncConfigured,
  loginWithEmail,
  logoutCloud,
  pullCloudProgress,
  pushCloudProgress,
  registerWithEmail,
} from './lib/cloudSync';

type Screen = 'welcome' | 'map' | 'level' | 'domain_challenge' | 'knowledge' | 'boss' | 'gameover';

const GameApp: React.FC = () => {
  const { state, startLevel, completeLevel, completeBoss, completeKnowledgeRoom, resetLevel, setPlayerInfo } = useGame();
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [currentLevelId, setCurrentLevelId] = useState<number>(0);
  const [gameOverScore, setGameOverScore] = useState<number>(0);
  const [isBossGameOver, setIsBossGameOver] = useState<boolean>(false);
  const [challengeLevelId, setChallengeLevelId] = useState<number>(0);
  const [pendingPerfectChallenge, setPendingPerfectChallenge] = useState<boolean>(false);

  const [cloudEmail, setCloudEmail] = useState('');
  const [cloudPassword, setCloudPassword] = useState('');
  const [cloudError, setCloudError] = useState('');
  const [cloudStatus, setCloudStatus] = useState('Local');
  const [cloudSyncAt, setCloudSyncAt] = useState<number>(0);
  const [showCloudPanel, setShowCloudPanel] = useState(false);

  const authSession = useMemo(() => getAuthSession(), [cloudStatus]);

  useEffect(() => {
    let mounted = true;

    const restoreSession = async () => {
      const savedSession = await loadAppSessionFromIndexedDb();
      if (!mounted || !savedSession) return;

      setCurrentScreen(savedSession.currentScreen);
      setCurrentLevelId(savedSession.currentLevelId);
      setGameOverScore(savedSession.gameOverScore);
      setIsBossGameOver(savedSession.isBossGameOver);
      setChallengeLevelId(savedSession.challengeLevelId);
      setPendingPerfectChallenge(savedSession.pendingPerfectChallenge);
    };

    void restoreSession();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (state.playerName && currentScreen === 'welcome') {
      setCurrentScreen('map');
    }
  }, [state.playerName, currentScreen]);

  useEffect(() => {
    if (!state.playerName) return;

    const session: Omit<AppSessionState, 'updatedAt'> = {
      currentScreen,
      currentLevelId,
      gameOverScore,
      isBossGameOver,
      challengeLevelId,
      pendingPerfectChallenge,
    };

    void saveAppSessionToIndexedDb(session);
  }, [state.playerName, currentScreen, currentLevelId, gameOverScore, isBossGameOver, challengeLevelId, pendingPerfectChallenge]);

  useEffect(() => {
    const syncCloud = async () => {
      if (!navigator.onLine || !isCloudSyncConfigured() || !getAuthSession() || !state.playerName) return;

      const persistedGame = await loadGameStateFromIndexedDb();
      const appSession = await loadAppSessionFromIndexedDb();
      if (!persistedGame || !appSession) return;

      await pushCloudProgress({
        game: persistedGame,
        appSession,
        lastSyncAt: Date.now(),
      });
      setCloudStatus('Sincronizado');
      setCloudSyncAt(Date.now());
    };

    void syncCloud();
  }, [state]);

  const handleCloudLogin = async (mode: 'login' | 'register') => {
    setCloudError('');
    try {
      if (!isCloudSyncConfigured()) {
        setCloudError('Configura VITE_FIREBASE_API_KEY y VITE_FIREBASE_DATABASE_URL para activar nube.');
        return;
      }

      if (mode === 'login') {
        await loginWithEmail(cloudEmail, cloudPassword);
      } else {
        await registerWithEmail(cloudEmail, cloudPassword);
      }

      const cloudData = await pullCloudProgress();
      if (cloudData?.game?.data?.playerName) {
        setPlayerInfo(cloudData.game.data.playerName, cloudData.game.data.avatar || '🧙');
      }

      if (cloudData?.appSession) {
        setCurrentScreen(cloudData.appSession.currentScreen);
        setCurrentLevelId(cloudData.appSession.currentLevelId);
        setGameOverScore(cloudData.appSession.gameOverScore);
        setIsBossGameOver(cloudData.appSession.isBossGameOver);
        setChallengeLevelId(cloudData.appSession.challengeLevelId);
        setPendingPerfectChallenge(cloudData.appSession.pendingPerfectChallenge);
      }

      setCloudStatus('Conectado');
      setShowCloudPanel(false);
    } catch (error) {
      setCloudError((error as Error).message);
    }
  };

  const handleCloudLogout = () => {
    logoutCloud();
    setCloudStatus('Local');
  };

  const handleStartLevel = (levelId: number) => {
    startLevel(levelId);
    setCurrentLevelId(levelId);
    setCurrentScreen('level');
  };

  const handleLevelComplete = (wasPerfect: boolean = false) => {
    setChallengeLevelId(currentLevelId);
    setPendingPerfectChallenge(wasPerfect);
    setCurrentScreen('domain_challenge');
  };

  const handleKnowledgeComplete = () => {
    completeKnowledgeRoom();
    setCurrentScreen('map');
  };

  const handleStartBoss = () => {
    setCurrentScreen('boss');
  };

  const handleBossComplete = (timeRemaining: number = 0) => {
    completeBoss(timeRemaining);
    setCurrentScreen('map');
  };

  const handleGameOver = (isBoss: boolean = false) => {
    setGameOverScore(state.score);
    setIsBossGameOver(isBoss);
    setCurrentScreen('gameover');
  };

  const handleRetry = () => {
    if (isBossGameOver) {
      setCurrentScreen('boss');
    } else {
      resetLevel();
      setCurrentScreen('level');
    }
  };

  const handleMenu = () => {
    setCurrentScreen('map');
  };

  const getCurrentLevel = () => {
    return levels.find(l => l.id === currentLevelId) || null;
  };

  const handleBackToMapAnytime = () => {
    resetLevel();
    setCurrentScreen('map');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'map':
        return <MapScreen onLevelSelect={handleStartLevel} onBossSelect={handleStartBoss} />;
      case 'level': {
        const level = getCurrentLevel();
        if (!level) return <WelcomeScreen />;
        return (
          <LevelScreen
            level={level}
            onComplete={handleLevelComplete}
            onKnowledge={() => setCurrentScreen('knowledge')}
            onExitToMap={() => {
              resetLevel();
              setCurrentScreen('map');
            }}
          />
        );
      }
      case 'domain_challenge': {
        const challengeLevel = levels.find(l => l.id === challengeLevelId) || getCurrentLevel();
        return (
          <DomainChallengeScreen
            level={challengeLevel}
            onComplete={() => {
              completeLevel(challengeLevelId, pendingPerfectChallenge);
              setCurrentScreen('knowledge');
            }}
            onFail={() => {
              resetLevel();
              setCurrentLevelId(challengeLevelId);
              setCurrentScreen('level');
            }}
          />
        );
      }
      case 'knowledge': {
        const knowledgeLevel = getCurrentLevel();
        if (!knowledgeLevel) return <WelcomeScreen />;
        return <KnowledgeRoom level={knowledgeLevel} onComplete={handleKnowledgeComplete} />;
      }
      case 'boss':
        return <BossScreen onComplete={handleBossComplete} onGameOver={() => handleGameOver(true)} />;
      case 'gameover':
        return <GameOverScreen score={gameOverScore} onRetry={handleRetry} onMenu={handleMenu} isBoss={isBossGameOver} />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div className="min-h-screen relative">
      {renderScreen()}

      {state.playerName && currentScreen !== 'map' && (
        <button
          onClick={handleBackToMapAnytime}
          className="fixed top-4 right-4 z-50 px-4 py-2 rounded-xl bg-black/70 text-white font-semibold border border-white/20 hover:bg-black/85"
        >
          ← Mapa
        </button>
      )}

      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => setShowCloudPanel((prev) => !prev)}
          className="px-3 py-2 rounded-xl bg-indigo-900/80 text-white text-sm border border-indigo-300/40"
        >
          ☁️ {authSession ? 'Nube conectada' : 'Login nube'}
        </button>

        {showCloudPanel && (
          <div className="mt-2 w-72 bg-slate-900/95 border border-white/20 rounded-xl p-3 text-white text-sm space-y-2">
            <p>Estado: {cloudStatus}</p>
            {cloudSyncAt > 0 && <p className="text-xs text-white/70">Última sync: {new Date(cloudSyncAt).toLocaleTimeString()}</p>}
            {!authSession ? (
              <>
                <input
                  value={cloudEmail}
                  onChange={(e) => setCloudEmail(e.target.value)}
                  className="w-full px-2 py-1 rounded bg-white/10 border border-white/20"
                  placeholder="email"
                />
                <input
                  type="password"
                  value={cloudPassword}
                  onChange={(e) => setCloudPassword(e.target.value)}
                  className="w-full px-2 py-1 rounded bg-white/10 border border-white/20"
                  placeholder="password"
                />
                <div className="flex gap-2">
                  <button className="flex-1 px-2 py-1 rounded bg-indigo-600" onClick={() => void handleCloudLogin('login')}>Entrar</button>
                  <button className="flex-1 px-2 py-1 rounded bg-emerald-600" onClick={() => void handleCloudLogin('register')}>Crear</button>
                </div>
              </>
            ) : (
              <button className="w-full px-2 py-1 rounded bg-rose-600" onClick={handleCloudLogout}>Cerrar sesión</button>
            )}
            {cloudError && <p className="text-rose-300 text-xs">{cloudError}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <GameProvider>
      <GameApp />
    </GameProvider>
  );
}

export default App;
