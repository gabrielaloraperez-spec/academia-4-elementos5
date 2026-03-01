// Game Data Configuration
// La Academia de los Cuatro Reinos - Enhanced Version

export interface Problem {
  id: number;
  question: string;
  answer: number;
  options: number[];
  hint?: string;
}

export interface KnowledgeContent {
  title: string;
  content: string;
  miniQuestions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
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
  knowledge: KnowledgeContent;
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
  problems: [
    { id: 1, question: "3 + 4 = ?", answer: 7, options: [6, 7, 8, 9], hint: "Cuenta hacia adelante desde 4 tres pasos" },
    { id: 2, question: "5 + 2 = ?", answer: 7, options: [7, 6, 8, 9], hint: "Suma primero las unidades" },
    { id: 3, question: "8 + 1 = ?", answer: 9, options: [7, 8, 9, 10], hint: "Agregar 1 aumenta en uno" },
    { id: 4, question: "14 + 23 = ?", answer: 37, options: [35, 37, 39, 33], hint: "4 + 3 = 7 y 1 + 2 = 3" },
    { id: 5, question: "27 + 18 = ?", answer: 45, options: [43, 45, 47, 44], hint: "7 + 8 = 15, lleva 1" },
    { id: 6, question: "36 + 27 = ?", answer: 63, options: [62, 63, 64, 61], hint: "6 + 7 = 13, escribe 3 y lleva 1" },
    { id: 7, question: "125 + 243 = ?", answer: 368, options: [358, 368, 378, 348], hint: "Suma por columnas" },
    { id: 8, question: "347 + 158 = ?", answer: 505, options: [495, 505, 515, 485], hint: "7 + 8 = 15, lleva 1" },
    { id: 9, question: "489 + 236 = ?", answer: 725, options: [715, 725, 735, 705], hint: "9 + 6 = 15, lleva 1" },
    { id: 10, question: "562 + 317 = ?", answer: 879, options: [869, 879, 889, 859], hint: "2 + 7 = 9, 6 + 1 + 1 = 8" }
  ],
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

// Level 2: Subtraction - Reino de la Defensa
export const level2Data: Level = {
  id: 2,
  name: "Reino del Equilibrio",
  realm: "Equilibrio",
  operation: "subtraction",
  operationSpanish: "Sustracción",
  icon: "🛡️",
  color: "#2563eb",
  bgColor: "#eff6ff",
  accentColor: "#dbeafe",
  problems: [
    { id: 1, question: "9 - 4 = ?", answer: 5, options: [4, 5, 6, 7], hint: "Cuenta hacia atrás 4 pasos" },
    { id: 2, question: "7 - 3 = ?", answer: 4, options: [3, 4, 5, 6], hint: "Quitar 3 de 7" },
    { id: 3, question: "8 - 5 = ?", answer: 3, options: [2, 3, 4, 5], hint: "Piensa: ¿qué número más 5 da 8?" },
    { id: 4, question: "45 - 23 = ?", answer: 22, options: [20, 22, 24, 26], hint: "5 - 3 = 2 y 4 - 2 = 2" },
    { id: 5, question: "68 - 19 = ?", answer: 49, options: [47, 48, 49, 50], hint: "Toma prestado en las unidades" },
    { id: 6, question: "93 - 47 = ?", answer: 46, options: [44, 45, 46, 47], hint: "13 - 7 = 6 y luego 8 - 4 = 4" },
    { id: 7, question: "425 - 137 = ?", answer: 288, options: [278, 288, 298, 268], hint: "Resta por columnas" },
    { id: 8, question: "700 - 256 = ?", answer: 444, options: [434, 444, 454, 424], hint: "Pide prestado del 7" },
    { id: 9, question: "864 - 329 = ?", answer: 535, options: [525, 535, 545, 515], hint: "14 - 9 = 5" },
    { id: 10, question: "932 - 458 = ?", answer: 474, options: [464, 474, 484, 454], hint: "12 - 8 = 4" }
  ],
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

// Level 3: Multiplication - Reino de la Construcción
export const level3Data: Level = {
  id: 3,
  name: "Reino de la Expansión",
  realm: "Expansión",
  operation: "multiplication",
  operationSpanish: "Multiplicación",
  icon: "🔨",
  color: "#059669",
  bgColor: "#ecfdf5",
  accentColor: "#d1fae5",
  problems: [
    { id: 1, question: "3 × 2 = ?", answer: 6, options: [4, 5, 6, 7], hint: "3 grupos de 2" },
    { id: 2, question: "4 × 2 = ?", answer: 8, options: [6, 7, 8, 9], hint: "Doble de 4" },
    { id: 3, question: "5 × 1 = ?", answer: 5, options: [4, 5, 6, 7], hint: "Todo número por 1 es el mismo" },
    { id: 4, question: "12 × 3 = ?", answer: 36, options: [33, 36, 39, 42], hint: "(10 × 3) + (2 × 3)" },
    { id: 5, question: "14 × 4 = ?", answer: 56, options: [52, 54, 56, 58], hint: "14 + 14 + 14 + 14" },
    { id: 6, question: "23 × 2 = ?", answer: 46, options: [44, 45, 46, 47], hint: "Doble de 23" },
    { id: 7, question: "123 × 3 = ?", answer: 369, options: [359, 369, 379, 349], hint: "3 × 100 + 3 × 20 + 3 × 3" },
    { id: 8, question: "215 × 4 = ?", answer: 860, options: [840, 850, 860, 870], hint: "Descompón 215" },
    { id: 9, question: "304 × 2 = ?", answer: 608, options: [606, 608, 610, 612], hint: "Doble de 304" },
    { id: 10, question: "111 × 5 = ?", answer: 555, options: [550, 555, 560, 565], hint: "5 × 100 + 5 × 10 + 5 × 1" }
  ],
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

// Level 4: Division - Reino de la Distribución
export const level4Data: Level = {
  id: 4,
  name: "Reino de la Precisión",
  realm: "Precisión",
  operation: "division",
  operationSpanish: "División",
  icon: "⚖️",
  color: "#7c3aed",
  bgColor: "#f5f3ff",
  accentColor: "#ede9fe",
  problems: [
    { id: 1, question: "8 ÷ 2 = ?", answer: 4, options: [3, 4, 5, 6], hint: "¿Qué número por 2 da 8?" },
    { id: 2, question: "9 ÷ 3 = ?", answer: 3, options: [2, 3, 4, 5], hint: "3 × 3 = 9" },
    { id: 3, question: "6 ÷ 2 = ?", answer: 3, options: [2, 3, 4, 5], hint: "Reparte 6 en 2 grupos" },
    { id: 4, question: "48 ÷ 6 = ?", answer: 8, options: [6, 7, 8, 9], hint: "6 × 8 = 48" },
    { id: 5, question: "72 ÷ 8 = ?", answer: 9, options: [8, 9, 10, 11], hint: "8 × 9 = 72" },
    { id: 6, question: "96 ÷ 12 = ?", answer: 8, options: [6, 7, 8, 9], hint: "12 × 8 = 96" },
    { id: 7, question: "144 ÷ 12 = ?", answer: 12, options: [10, 11, 12, 13], hint: "12 × 12 = 144" },
    { id: 8, question: "288 ÷ 24 = ?", answer: 12, options: [10, 11, 12, 13], hint: "24 × 12 = 288" },
    { id: 9, question: "576 ÷ 18 = ?", answer: 32, options: [30, 31, 32, 33], hint: "18 × 32 = 576" },
    { id: 10, question: "999 ÷ 27 = ?", answer: 37, options: [35, 36, 37, 38], hint: "27 × 37 = 999" }
  ],
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

// Boss Level Problems (Mixed operations)
export const bossProblems: Problem[] = [
  { id: 1, question: "25 + 17 = ?", answer: 42, options: [40, 42, 44, 38], hint: "25 + 17 = 25 + 15 + 2" },
  { id: 2, question: "93 - 48 = ?", answer: 45, options: [43, 45, 47, 41], hint: "93 - 48 = 93 - 50 + 2" },
  { id: 3, question: "8 × 7 = ?", answer: 56, options: [52, 54, 56, 58], hint: "8 × 7 = 8 × 5 + 8 × 2" },
  { id: 4, question: "72 ÷ 8 = ?", answer: 9, options: [7, 8, 9, 10], hint: "8 × 9 = 72" },
  { id: 5, question: "34 + 29 = ?", answer: 63, options: [60, 61, 63, 65], hint: "34 + 29 = 34 + 30 - 1" },
  { id: 6, question: "156 - 78 = ?", answer: 78, options: [76, 78, 80, 74], hint: "156 - 78 = 156 - 80 + 2" },
  { id: 7, question: "9 × 9 = ?", answer: 81, options: [78, 81, 84, 79], hint: "9 × 9 = 9 × 10 - 9" },
  { id: 8, question: "64 ÷ 8 = ?", answer: 8, options: [6, 7, 8, 9], hint: "8 × 8 = 64" },
  { id: 9, question: "47 + 38 = ?", answer: 85, options: [82, 83, 85, 87], hint: "47 + 38 = 47 + 40 - 2" },
  { id: 10, question: "100 - 56 = ?", answer: 44, options: [42, 44, 46, 40], hint: "100 - 56 = 100 - 50 - 6" },
  { id: 11, question: "12 × 6 = ?", answer: 72, options: [68, 70, 72, 66], hint: "12 × 6 = 10 × 6 + 2 × 6" },
  { id: 12, question: "96 ÷ 12 = ?", answer: 8, options: [6, 7, 8, 9], hint: "12 × 8 = 96" },
  { id: 13, question: "56 + 47 = ?", answer: 103, options: [100, 101, 103, 105], hint: "56 + 47 = 56 + 50 - 3" },
  { id: 14, question: "234 - 167 = ?", answer: 67, options: [65, 67, 69, 63], hint: "234 - 167 = 234 - 170 + 3" },
  { id: 15, question: "15 × 5 = ?", answer: 75, options: [70, 73, 75, 77], hint: "15 × 5 = 15 × 10 ÷ 2" },
  { id: 16, question: "108 ÷ 9 = ?", answer: 12, options: [10, 11, 12, 13], hint: "9 × 12 = 108" },
  { id: 17, question: "89 + 76 = ?", answer: 165, options: [160, 163, 165, 167], hint: "89 + 76 = 89 + 80 - 4" },
  { id: 18, question: "300 - 145 = ?", answer: 155, options: [150, 153, 155, 157], hint: "300 - 145 = 300 - 150 + 5" },
  { id: 19, question: "24 × 4 = ?", answer: 96, options: [92, 94, 96, 98], hint: "24 × 4 = 20 × 4 + 4 × 4" },
  { id: 20, question: "144 ÷ 12 = ?", answer: 12, options: [10, 11, 12, 14], hint: "12 × 12 = 144" }
];

// Abilities
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

// Achievements
export const achievements: Achievement[] = [
  {
    id: "first_level",
    name: "Primer Paso",
    description: "Completa tu primer reino",
    icon: "★",
    condition: "levels_completed",
    requirement: 1
  },
  {
    id: "perfect_level",
    name: "Perfección",
    description: "Completa un nivel sin errores",
    icon: "◆",
    condition: "perfect_level",
    requirement: 1
  },
  {
    id: "streak_5",
    name: "Racha de Fuego",
    description: "Consigue 5 respuestas correctas seguidas",
    icon: "🔥",
    condition: "streak",
    requirement: 5
  },
  {
    id: "streak_10",
    name: "Maestro Ardiente",
    description: "Consigue 10 respuestas correctas seguidas",
    icon: "⚡",
    condition: "streak",
    requirement: 10
  },
  {
    id: "boss_killer",
    name: "Conquistador",
    description: "Derrota al jefe final",
    icon: "👑",
    condition: "boss_completed",
    requirement: 1
  },
  {
    id: "all_knowledge",
    name: "Erudito",
    description: "Completa todas las Salas del Conocimiento",
    icon: "📚",
    condition: "knowledge_rooms",
    requirement: 4
  },
  {
    id: "speed_demon",
    name: "Velocista",
    description: "Completa el jefe en menos de 60 segundos",
    icon: "⚡",
    condition: "boss_time",
    requirement: 60
  },
  {
    id: "addition_master",
    name: "Maestro de la Energía",
    description: "Dominio completo de la adición",
    icon: "+",
    condition: "operation_mastery",
    requirement: 100
  },
  {
    id: "subtraction_master",
    name: "Maestro de la Defensa",
    description: "Dominio completo de la sustracción",
    icon: "−",
    condition: "operation_mastery",
    requirement: 100
  },
  {
    id: "multiplication_master",
    name: "Maestro de la Construcción",
    description: "Dominio completo de la multiplicación",
    icon: "×",
    condition: "operation_mastery",
    requirement: 100
  },
  {
    id: "division_master",
    name: "Maestro de la Distribución",
    description: "Dominio completo de la división",
    icon: "÷",
    condition: "operation_mastery",
    requirement: 100
  }
];

// Scoring
export const SCORING = {
  CORRECT_ANSWER: 100,
  STREAK_BONUS: 10,
  STREAK_MAX: 50,
  BOSS_TIME_BONUS: 5,
  BOSS_COMPLETE_BONUS: 1000,
  LIVES_BONUS: 200,
  PERFECT_LEVEL_BONUS: 500
};

// Operation info for display
export const operationInfo = {
  addition: { symbol: "+", name: "Adición", color: "#dc2626" },
  subtraction: { symbol: "−", name: "Sustracción", color: "#2563eb" },
  multiplication: { symbol: "×", name: "Multiplicación", color: "#059669" },
  division: { symbol: "÷", name: "División", color: "#7c3aed" }
};
