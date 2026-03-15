import { additionProblems } from '../game/challenges/addition';
import { subtractionProblems } from '../game/challenges/subtraction';
import { multiplicationProblems } from '../game/challenges/multiplication';
import { divisionProblems } from '../game/challenges/division';
import { bossProblems } from '../game/challenges/boss';
import type { Ability, Achievement, Level } from './types';

export type { Problem, KnowledgeContent, Level, Ability, Achievement } from './types';

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
  problems: additionProblems,
  knowledge: {
    title: "El Sistema Numérico Romano",
    content: "Los romanos usaban un sistema de numeración no posicional con letras: I (1), V (5), X (10), L (50), C (100), D (500), M (1000). No tenían cero. Para sumar, juntaban los símbolos. Ejemplo: III + II = V (3 + 2 = 5). El sistema romano se usaba para construir acueductos, templos y registrar impuestos.",
    miniQuestions: [
      {
        question: "¿Qué valor tiene el número romano X?",
        options: ["1", "5", "10", "50"],
        correctAnswer: 2
      },
      {
        question: "¿Cómo se escribe 100 en números romanos?",
        options: ["C", "M", "L", "D"],
        correctAnswer: 0
      }
    ]
  }
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
  problems: subtractionProblems,
  knowledge: {
    title: "El Sistema Numérico Maya",
    content: "Los mayas usaban un sistema vigesimal (base 20) con tres símbolos: el punto (1), la barra (5) y la concha (0). Escribían verticalmente de abajo arriba. Por ejemplo: dos puntos (2) más un punto (1) = tres puntos (3). Los mayas fueron de las primeras civilizaciones en usar el cero como número, ¡hace más de 2000 años!",
    miniQuestions: [
      {
        question: "¿En qué base funcionaba el sistema maya?",
        options: ["10", "20", "5", "60"],
        correctAnswer: 1
      },
      {
        question: "¿Qué símbolo representaba el 5 en números mayas?",
        options: ["Punto", "Barra", "Concha", "Círculo"],
        correctAnswer: 1
      }
    ]
  }
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
  problems: multiplicationProblems,
  knowledge: {
    title: "El Sistema Numérico Decimal",
    content: "Nuestro sistema decimal usa base 10 con dígitos del 0 al 9. Es un sistema posicional: el valor de cada dígito depende de su posición. Por ejemplo, en 532: 5 vale 500 (5×100), 3 vale 30 (3×10), 2 vale 2. Este sistema proviene de los dedos de nuestras manos. Los hindúes lo perfeccionaron en el siglo V y los árabes lo difundieron por Europa.",
    miniQuestions: [
      {
        question: "¿Cuántos dígitos tiene el sistema decimal?",
        options: ["8", "9", "10", "11"],
        correctAnswer: 2
      },
      {
        question: "En el número 456, ¿qué valor tiene el 4?",
        options: ["4", "40", "400", "4000"],
        correctAnswer: 2
      }
    ]
  }
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
  problems: divisionProblems,
  knowledge: {
    title: "Comparación de Sistemas Numéricos",
    content: "Cada civilización desarrolló su propio sistema: Romano (no posicional, letras), Maya (vigésimal con cero), Decimal (posicional base 10), Babilónico (sexagesimal base 60). El sistema decimal que usamos hoy fue creado en India y распространился por el mundo árabe. Hoy usamos matemáticas de todos estos sistemas: horas (60), años (12 meses), dinero (decimal).",
    miniQuestions: [
      {
        question: "¿Qué sistema usaba base 60?",
        options: ["Romano", "Maya", "Babilónico", "Decimal"],
        correctAnswer: 2
      },
      {
        question: "¿Qué civilizaciones usaron el cero primero?",
        options: ["Romanos", "Griegos", "Mayas e Hindúes", "Egipcios"],
        correctAnswer: 2
      }
    ]
  }
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
  { id: "all_knowledge", name: "Erudito", description: "Completa todas las Salas del Conocimiento", icon: "📚", condition: "knowledge_rooms", requirement: 4 },
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
