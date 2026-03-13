import { Problem } from '../../data/types';

export const subtractionProblems: Problem[] = [
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
];
