import { additionProblems } from '../game/challenges/addition';
import { subtractionProblems } from '../game/challenges/subtraction';
import { multiplicationProblems } from '../game/challenges/multiplication';
import { divisionProblems } from '../game/challenges/division';
import { bossProblems } from '../game/challenges/boss';
import type { Ability, Achievement, Level } from './types';

export type { Problem, Level, Ability, Achievement } from './types';

// Level 1: Addition - Reino de la Energía
export const level1Data: Level = {
  id: 1,
  name: "Reino de la Energía",
  realm: "Energía",
  operation: "addition",
  operationSpanish: "Adición",
  icon: "⚡",
  color: "#dc2626",
  bgColor: "#fef2f2",
  accentColor: "#fecaca",
  problems: additionProblems
};

export const level2Data: Level = {
  id: 2,
  name: "Reino de la Defensa",
  realm: "Defensa",
  operation: "subtraction",
  operationSpanish: "Sustracción",
  icon: "🛡️",
  color: "#2563eb",
  bgColor: "#eff6ff",
  accentColor: "#dbeafe",
  problems: subtractionProblems
};

export const level3Data: Level = {
  id: 3,
  name: "Reino de la Construcción",
  realm: "Construcción",
  operation: "multiplication",
  operationSpanish: "Multiplicación",
  icon: "🔨",
  color: "#059669",
  bgColor: "#ecfdf5",
  accentColor: "#d1fae5",
  problems: multiplicationProblems
};

export const level4Data: Level = {
  id: 4,
  name: "Reino de la Distribución",
  realm: "Distribución",
  operation: "division",
  operationSpanish: "División",
  icon: "⚖️",
  color: "#7c3aed",
  bgColor: "#f5f3ff",
  accentColor: "#ede9fe",
  problems: divisionProblems
};

export const levels: Level[] = [level1Data, level2Data, level3Data, level4Data];

export { bossProblems };

export const abilities: Ability[] = [
  {
    id: "shield",
    name: "Escudo",
    description: "Ignora un error",
    icon: "🛡",
    cost: 50,
    maxUses: 3
  },
  {
    id: "recharge",
    name: "Vida",
    description: "Recupera 1 corazón",
    icon: "♥",
    cost: 80,
    maxUses: 2
  },
  {
    id: "multiplier",
    name: "Doble",
    description: "2x puntos por 3 preguntas",
    icon: "×2",
    cost: 40,
    maxUses: 5
  },
  {
    id: "extratime",
    name: "Tiempo",
    description: "+5 segundos",
    icon: "⏱",
    cost: 60,
    maxUses: 3
  }
];

export const achievements: Achievement[] = [
  { id: "first_level", name: "Primer Paso", description: "Completa tu primer reino", icon: "★", condition: "levels_completed", requirement: 1 },
  { id: "perfect_level", name: "Perfección", description: "Completa un nivel sin errores", icon: "◆", condition: "perfect_level", requirement: 1 },
  { id: "streak_5", name: "Racha de Fuego", description: "Consigue 5 respuestas correctas seguidas", icon: "🔥", condition: "streak", requirement: 5 },
  { id: "streak_10", name: "Maestro Ardiente", description: "Consigue 10 respuestas correctas seguidas", icon: "⚡", condition: "streak", requirement: 10 },
  { id: "boss_killer", name: "Conquistador", description: "Derrota al jefe final", icon: "👑", condition: "boss_completed", requirement: 1 },
  { id: "speed_demon", name: "Velocista", description: "Completa el jefe en menos de 60 segundos", icon: "⚡", condition: "boss_time", requirement: 60 },
  { id: "addition_master", name: "Maestro de la Energía", description: "Dominio completo de la adición", icon: "+", condition: "operation_mastery", requirement: 100 },
  { id: "subtraction_master", name: "Maestro de la Defensa", description: "Dominio completo de la sustracción", icon: "−", condition: "operation_mastery", requirement: 100 },
  { id: "multiplication_master", name: "Maestro de la Construcción", description: "Dominio completo de la multiplicación", icon: "×", condition: "operation_mastery", requirement: 100 },
  { id: "division_master", name: "Maestro de la Distribución", description: "Dominio completo de la división", icon: "÷", condition: "operation_mastery", requirement: 100 }
];

export const SCORING = {
  CORRECT_ANSWER: 100,
  STREAK_BONUS: 10,
  STREAK_MAX: 50,
  BOSS_TIME_BONUS: 5,
  BOSS_COMPLETE_BONUS: 1000,
  LIVES_BONUS: 200,
  PERFECT_LEVEL_BONUS: 500
};

export const operationInfo = {
  addition: { symbol: "+", name: "Adición", color: "#dc2626" },
  subtraction: { symbol: "−", name: "Sustracción", color: "#2563eb" },
  multiplication: { symbol: "×", name: "Multiplicación", color: "#059669" },
  division: { symbol: "÷", name: "División", color: "#7c3aed" }
};
