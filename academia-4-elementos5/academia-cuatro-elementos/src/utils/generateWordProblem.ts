export type ElementType = 'energia' | 'defensa' | 'construccion' | 'distribucion';

export interface WordProblem {
  level: 1 | 2 | 3;
  story: string;
  answer: number;
}

const randomInRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const ranges: Record<WordProblem['level'], { min: number; max: number }> = {
  1: { min: 1, max: 9 },
  2: { min: 10, max: 99 },
  3: { min: 100, max: 999 },
};

const buildEnergyProblem = (difficulty: WordProblem['level']): WordProblem => {
  const { min, max } = ranges[difficulty];
  const initial = randomInRange(min, max);
  const extra = randomInRange(min, max);
  return {
    level: difficulty,
    story: `Un espíritu de fuego reunió ${initial} cristales de energía. Más tarde encontró ${extra} cristales adicionales. ¿Cuántos cristales tiene ahora?`,
    answer: initial + extra,
  };
};

const buildDefenseProblem = (difficulty: WordProblem['level']): WordProblem => {
  const { min, max } = ranges[difficulty];
  const towers = randomInRange(min, max);
  const newTowers = randomInRange(min, max);
  return {
    level: difficulty,
    story: `Los guardianes levantaron ${towers} torres de defensa y luego construyeron ${newTowers} más para proteger el reino. ¿Cuántas torres hay en total?`,
    answer: towers + newTowers,
  };
};

const buildConstructionProblem = (difficulty: WordProblem['level']): WordProblem => {
  const { min, max } = ranges[difficulty];
  const blocks = randomInRange(min + 2, max);
  const used = randomInRange(min, Math.max(min, blocks - 1));
  return {
    level: difficulty,
    story: `En el patio de obra había ${blocks} bloques de piedra. Los constructores usaron ${used} para reparar una muralla. ¿Cuántos bloques quedan?`,
    answer: blocks - used,
  };
};

const buildDistributionProblem = (difficulty: WordProblem['level']): WordProblem => {
  const { min, max } = ranges[difficulty];
  const morning = randomInRange(min, max);
  const afternoon = randomInRange(min, max);
  return {
    level: difficulty,
    story: `Un canal transportó ${morning} contenedores de agua por la mañana y ${afternoon} por la tarde. ¿Cuántos contenedores se transportaron en total?`,
    answer: morning + afternoon,
  };
};

export const generateWordProblem = (elementType: ElementType, difficulty: WordProblem['level'] = 1): WordProblem => {
  const generators: Record<ElementType, (level: WordProblem['level']) => WordProblem> = {
    energia: buildEnergyProblem,
    defensa: buildDefenseProblem,
    construccion: buildConstructionProblem,
    distribucion: buildDistributionProblem,
  };

  return generators[elementType](difficulty);
};

export const generateWordProblemsForElement = (elementType: ElementType): WordProblem[] => ([
  generateWordProblem(elementType, 1),
  generateWordProblem(elementType, 2),
  generateWordProblem(elementType, 3),
]);
