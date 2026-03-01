export type KingdomOperation = 'addition' | 'subtraction' | 'multiplication' | 'division' | 'time';

export interface KingdomTheme {
  operation: KingdomOperation;
  kingdomName: string;
  elementName: string;
  icon: string;
  cardGradient: string;
  cardBorder: string;
  cardGlow: string;
  iconBg: string;
  textPrimary: string;
  textSecondary: string;
  accentText: string;
  hoverAnimation: string;
  particleClass: string;
  towerGlow?: string;
  towerFill?: string;
}

export const kingdomThemes: Record<KingdomOperation, KingdomTheme> = {
  addition: {
    operation: 'addition',
    kingdomName: 'Reino de la Energía',
    elementName: 'Fuego',
    icon: '🌀',
    cardGradient: 'from-blue-100 via-sky-100 to-cyan-100',
    cardBorder: 'border-sky-200/90',
    cardGlow: 'shadow-[0_18px_35px_-18px_rgba(56,189,248,0.95)]',
    iconBg: 'bg-white/75',
    textPrimary: 'text-blue-900',
    textSecondary: 'text-sky-700',
    accentText: 'text-white',
    hoverAnimation: 'group-hover:animate-float-air',
    particleClass: 'bg-sky-100',
  },
  subtraction: {
    operation: 'subtraction',
    kingdomName: 'Reino del Equilibrio',
    elementName: 'Aire',
    icon: '💧',
    cardGradient: 'from-blue-900 via-blue-800 to-cyan-700',
    cardBorder: 'border-cyan-300/40',
    cardGlow: 'shadow-[0_18px_35px_-16px_rgba(34,211,238,0.72)]',
    iconBg: 'bg-cyan-200/20',
    textPrimary: 'text-blue-100',
    textSecondary: 'text-cyan-100/90',
    accentText: 'text-white',
    hoverAnimation: 'group-hover:animate-ripple-water',
    particleClass: 'bg-cyan-200',
  },
  multiplication: {
    operation: 'multiplication',
    kingdomName: 'Reino de la Expansión',
    elementName: 'Tierra',
    icon: '🔥',
    cardGradient: 'from-orange-500 via-orange-400 to-amber-300',
    cardBorder: 'border-orange-200/60',
    cardGlow: 'shadow-[0_20px_38px_-14px_rgba(249,115,22,0.9)]',
    iconBg: 'bg-orange-100/25',
    textPrimary: 'text-yellow-100',
    textSecondary: 'text-orange-100/95',
    accentText: 'text-red-700',
    hoverAnimation: 'group-hover:animate-flare-fire',
    particleClass: 'bg-yellow-200',
  },
  division: {
    operation: 'division',
    kingdomName: 'Reino de la Precisión',
    elementName: 'Agua',
    icon: '🌍',
    cardGradient: 'from-green-900 via-emerald-900 to-lime-800',
    cardBorder: 'border-lime-300/35',
    cardGlow: 'shadow-[0_18px_35px_-16px_rgba(22,101,52,0.9)]',
    iconBg: 'bg-emerald-100/15',
    textPrimary: 'text-yellow-300',
    textSecondary: 'text-lime-100/80',
    accentText: 'text-amber-700',
    hoverAnimation: 'group-hover:animate-rumble-earth',
    particleClass: 'bg-lime-200',
  },
  time: {
    operation: 'time',
    kingdomName: 'Torre del Tiempo',
    elementName: 'Éter',
    icon: '⏳',
    cardGradient: 'from-purple-800 via-violet-700 to-purple-600',
    cardBorder: 'border-yellow-300/40',
    cardGlow: 'shadow-[0_18px_42px_-16px_rgba(168,85,247,0.88)]',
    iconBg: 'bg-purple-200/20',
    textPrimary: 'text-yellow-300',
    textSecondary: 'text-purple-200/90',
    accentText: 'text-purple-200',
    hoverAnimation: 'group-hover:animate-pulse-time',
    particleClass: 'bg-white',
    towerGlow: 'shadow-[0_0_28px_rgba(168,85,247,0.55)]',
    towerFill: 'from-yellow-300 via-amber-300 to-yellow-400',
  },
};

export const getKingdomTheme = (operation: string): KingdomTheme => {
  if (operation in kingdomThemes) {
    return kingdomThemes[operation as KingdomOperation];
  }

  return kingdomThemes.addition;
};
