import React, { useState, useEffect } from 'react';
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

type Screen = 'welcome' | 'map' | 'level' | 'domain_challenge' | 'knowledge' | 'boss' | 'gameover';

const GameApp: React.FC = () => {
  const { state, startLevel, completeLevel, completeBoss, resetLevel } = useGame();
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [currentLevelId, setCurrentLevelId] = useState<number>(0);
  const [gameOverScore, setGameOverScore] = useState<number>(0);
  const [isBossGameOver, setIsBossGameOver] = useState<boolean>(false);
  const [challengeLevelId, setChallengeLevelId] = useState<number>(0);
  const [pendingPerfectChallenge, setPendingPerfectChallenge] = useState<boolean>(false);

  // Check if player has set up their profile
  useEffect(() => {
    if (state.playerName && currentScreen === 'welcome') {
      setCurrentScreen('map');
    }
  }, [state.playerName, currentScreen]);

  const handleStartLevel = (levelId: number) => {
    setCurrentLevelId(levelId);
    setCurrentScreen('level');
  };

  const handleLevelComplete = (wasPerfect: boolean = false) => {
    setChallengeLevelId(currentLevelId);
    setPendingPerfectChallenge(wasPerfect);
    setCurrentScreen('domain_challenge');
  };

  const handleKnowledgeComplete = () => {
    // After completing knowledge room, unlock next level
    if (currentLevelId === 4) {
      // Boss is unlocked after level 4
      setCurrentScreen('map');
    } else {
      setCurrentScreen('map');
    }
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

  // Render current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen />;

      case 'map':
        return (
          <MapScreen
            onLevelSelect={handleStartLevel}
            onBossSelect={handleStartBoss}
          />
        );

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
        return (
          <KnowledgeRoom
            level={knowledgeLevel}
            onComplete={handleKnowledgeComplete}
          />
        );
      }

      case 'boss':
        return (
          <BossScreen
            onComplete={handleBossComplete}
            onGameOver={() => handleGameOver(true)}
          />
        );

      case 'gameover':
        return (
          <GameOverScreen
            score={gameOverScore}
            onRetry={handleRetry}
            onMenu={handleMenu}
            isBoss={isBossGameOver}
          />
        );

      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderScreen()}
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
