/**
 * Retorna uma nova array com os elementos de `items` embaralhados,
 * usando o algoritmo de Fisher-Yates.
 *
 * Função pura: não modifica o array de entrada e sempre recebe o
 * gerador de aleatoriedade como dependência injetável, o que a torna
 * 100% testável (ver `src/__tests__/shuffle.test.ts`).
 */
export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    const itemAtI = result[i];
    const itemAtJ = result[j];
    if (itemAtI === undefined || itemAtJ === undefined) continue;
    result[i] = itemAtJ;
    result[j] = itemAtI;
  }

  return result;
}

/** Retorna os `count` primeiros elementos de uma versão embaralhada de `items`. */
export function pickRandomSubset<T>(
  items: readonly T[],
  count: number,
  random: () => number = Math.random,
): T[] {
  const shuffled = shuffle(items, random);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
