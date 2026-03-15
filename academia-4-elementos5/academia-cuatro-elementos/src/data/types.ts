export interface Problem {
  id: number;
  question: string;
  answer: number;
  options: number[];
  hint?: string;
}

export interface Level {
  id: number;
  name: string;
  realm: string;
  operation: string;
  operationSpanish: string;
  icon: string;
  color: string;
  bgColor: string;
  accentColor: string;
  problems: Problem[];
}

export interface Ability {
  id: string;
  name: string;
  description: string;
  icon: string;
  cost: number;
  maxUses: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: string;
  requirement: number;
}
