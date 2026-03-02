import { createContext } from 'react';

export interface LevelStats {
  correct: number;
  incorrect: number;
  accuracy: number;
  mastery: number;
}

export interface GameState {
  currentLevel: number;
  lives: number;
  score: number;
  mana: number;
  streak: number;
  maxStreak: number;
  unlockedLevels: number[];
  abilityUses: { [key: string]: number };
  highScores: { [key: number]: number };
  isBossUnlocked: boolean;
  playerName: string;
  avatar: string;
  achievements: string[];
  knowledgeRoomsCompleted: number;
  levelStats: { [key: number]: LevelStats };
  operationMastery: { [key: string]: number };
  totalQuestionsAnswered: number;
  totalCorrect: number;
  currentLevelCorrect: number;
  currentLevelIncorrect: number;
}

export interface GameContextType {
  state: GameState;
  startLevel: (levelId: number) => void;
  answerQuestion: (isCorrect: boolean, isBoss?: boolean, scoreMultiplier?: number) => void;
  useAbility: (abilityId: string) => boolean;
  resetLevel: () => void;
  completeLevel: (levelId: number, wasPerfect: boolean) => void;
  completeBoss: (timeRemaining: number) => void;
  completeKnowledgeRoom: () => void;
  setPlayerInfo: (name: string, avatar: string) => void;
  getCurrentLevelData: () => import('../data/gameData').Level | null;
  getAbilityData: (abilityId: string) => import('../data/gameData').Ability | undefined;
  getLevelStats: (levelId: number) => LevelStats;
  getOverallProgress: () => { completed: number; total: number; percentage: number };
  getOperationMastery: (operation: string) => number;
}

export const initialState: GameState = {
  currentLevel: 0,
  lives: 3,
  score: 0,
  mana: 100,
  streak: 0,
  maxStreak: 0,
  unlockedLevels: [1],
  abilityUses: {
    shield: 3,
    recharge: 2,
    multiplier: 5,
    extratime: 3
  },
  highScores: {},
  isBossUnlocked: false,
  playerName: '',
  avatar: '',
  achievements: [],
  knowledgeRoomsCompleted: 0,
  levelStats: {},
  operationMastery: {
    addition: 0,
    subtraction: 0,
    multiplication: 0,
    division: 0
  },
  totalQuestionsAnswered: 0,
  totalCorrect: 0,
  currentLevelCorrect: 0,
  currentLevelIncorrect: 0
};

export const GameContext = createContext<GameContextType | undefined>(undefined);
