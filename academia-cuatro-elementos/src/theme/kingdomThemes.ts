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
  hoverAnimation: string;
  particleClass?: string;
  accentText?: string;
  towerGlow?: string;
  towerFill?: string;
}

export const kingdomThemes: Record<KingdomOperation, KingdomTheme> = {
  addition: {
    operation: 'addition',
    kingdomName: 'Reino de la Energía',
    elementName: 'Fuego',
    icon: '🌬️',
    cardGradient: 'from-sky-200/80 via-cyan-100/70 to-white/80',
    cardBorder: 'border-sky-200/80',
    cardGlow: 'shadow-[0_12px_28px_-16px_rgba(14,165,233,0.85)]',
    iconBg: 'bg-white/60',
    textPrimary: 'text-sky-950',
    textSecondary: 'text-sky-700',
    hoverAnimation: 'group-hover:animate-float-air',
    particleClass: 'bg-sky-300/80',
    accentText: 'text-sky-800',
  },
  subtraction: {
    operation: 'subtraction',
    kingdomName: 'Reino del Equilibrio',
    elementName: 'Aire',
    icon: '🌊',
    cardGradient: 'from-blue-950/90 via-blue-800/80 to-cyan-700/80',
    cardBorder: 'border-cyan-300/40',
    cardGlow: 'shadow-[0_14px_30px_-16px_rgba(6,182,212,0.7)]',
    iconBg: 'bg-cyan-300/20',
    textPrimary: 'text-cyan-100',
    textSecondary: 'text-cyan-200/80',
    hoverAnimation: 'group-hover:animate-ripple-water',
    particleClass: 'bg-cyan-200/80',
    accentText: 'text-cyan-100',
  },
  multiplication: {
    operation: 'multiplication',
    kingdomName: 'Reino de la Expansión',
    elementName: 'Tierra',
    icon: '🔥',
    cardGradient: 'from-red-700/95 via-orange-600/90 to-amber-400/85',
    cardBorder: 'border-amber-200/60',
    cardGlow: 'shadow-[0_16px_34px_-15px_rgba(251,146,60,0.95)]',
    iconBg: 'bg-amber-100/20',
    textPrimary: 'text-amber-50',
    textSecondary: 'text-amber-100/80',
    hoverAnimation: 'group-hover:animate-flare-fire',
    particleClass: 'bg-amber-200/80',
    accentText: 'text-amber-50',
  },
  division: {
    operation: 'division',
    kingdomName: 'Reino de la Precisión',
    elementName: 'Agua',
    icon: '🪨',
    cardGradient: 'from-emerald-900/90 via-lime-900/90 to-amber-900/80',
    cardBorder: 'border-amber-200/30',
    cardGlow: 'shadow-[0_12px_28px_-16px_rgba(146,64,14,0.85)]',
    iconBg: 'bg-amber-200/15',
    textPrimary: 'text-lime-50',
    textSecondary: 'text-lime-100/75',
    hoverAnimation: 'group-hover:animate-rumble-earth',
    particleClass: 'bg-lime-200/80',
    accentText: 'text-lime-100',
  },
  time: {
    operation: 'time',
    kingdomName: 'Torre del Tiempo',
    elementName: 'Éter',
    icon: '🕰️',
    cardGradient: 'from-violet-950 via-purple-900 to-amber-800',
    cardBorder: 'border-amber-300/50',
    cardGlow: 'shadow-[0_16px_36px_-16px_rgba(250,204,21,0.7)]',
    iconBg: 'bg-violet-200/20',
    textPrimary: 'text-amber-100',
    textSecondary: 'text-violet-200/80',
    hoverAnimation: 'group-hover:animate-pulse-time',
    particleClass: 'bg-violet-200/80',
    accentText: 'text-amber-100',
    towerGlow: 'shadow-[0_0_35px_rgba(168,85,247,0.55)]',
    towerFill: 'from-fuchsia-400 via-violet-300 to-amber-300',
  },
};

export const getKingdomTheme = (operation: string): KingdomTheme => {
  if (operation in kingdomThemes) {
    return kingdomThemes[operation as KingdomOperation];
  }

  return kingdomThemes.addition;
};
