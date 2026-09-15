import { describe, expect, it } from 'vitest';

import { pickRandomSubset, shuffle } from '@/lib/shuffle';

describe('shuffle', () => {
  it('não modifica a array original (imutabilidade)', () => {
    const original = [1, 2, 3, 4, 5];
    const copy = [...original];

    shuffle(original);

    expect(original).toEqual(copy);
  });

  it('mantém os mesmos elementos, apenas reordenados', () => {
    const original = [1, 2, 3, 4, 5];
    const result = shuffle(original);

    expect(result).toHaveLength(original.length);
    expect(result.sort()).toEqual([...original].sort());
  });

  it('é determinístico: o mesmo gerador de aleatoriedade sempre produz o mesmo resultado', () => {
    const alwaysZero = () => 0;

    const resultA = shuffle([1, 2, 3, 4], alwaysZero);
    const resultB = shuffle([1, 2, 3, 4], alwaysZero);

    expect(resultA).toEqual(resultB);
  });
});

describe('pickRandomSubset', () => {
  it('retorna exatamente `count` elementos quando o array de entrada é maior', () => {
    const result = pickRandomSubset([1, 2, 3, 4, 5], 3);
    expect(result).toHaveLength(3);
  });

  it('nunca retorna mais elementos do que os disponíveis', () => {
    const result = pickRandomSubset([1, 2], 10);
    expect(result).toHaveLength(2);
  });

  it('todos os elementos retornados pertencem ao array original', () => {
    const source = [1, 2, 3, 4, 5];
    const result = pickRandomSubset(source, 3);

    result.forEach((item) => {
      expect(source).toContain(item);
    });
  });
});
