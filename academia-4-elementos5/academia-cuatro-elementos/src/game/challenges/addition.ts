import { Problem } from '../../data/types';

export const additionProblems: Problem[] = [
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
];
