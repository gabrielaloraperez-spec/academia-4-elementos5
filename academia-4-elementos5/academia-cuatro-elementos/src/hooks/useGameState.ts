import { useCallback, useState } from 'react';

export type Screen = 'welcome' | 'map' | 'level' | 'domain_challenge' | 'knowledge' | 'boss' | 'gameover';

export const useGameState = () => {
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

  const resetLocalUiState = useCallback(() => {
    setCurrentScreen('welcome');
    setCurrentLevelId(0);
    setGameOverScore(0);
    setIsBossGameOver(false);
    setChallengeLevelId(0);
    setPendingPerfectChallenge(false);
    setCloudError('');
    setShowCloudPanel(false);
  }, []);

  return {
    currentScreen,
    setCurrentScreen,
    currentLevelId,
    setCurrentLevelId,
    gameOverScore,
    setGameOverScore,
    isBossGameOver,
    setIsBossGameOver,
    challengeLevelId,
    setChallengeLevelId,
    pendingPerfectChallenge,
    setPendingPerfectChallenge,
    cloudEmail,
    setCloudEmail,
    cloudPassword,
    setCloudPassword,
    cloudError,
    setCloudError,
    cloudStatus,
    setCloudStatus,
    cloudSyncAt,
    setCloudSyncAt,
    showCloudPanel,
    setShowCloudPanel,
    resetLocalUiState,
  };
};
