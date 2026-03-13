import { Problem } from '../../data/types';

export const multiplicationProblems: Problem[] = [
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
];
