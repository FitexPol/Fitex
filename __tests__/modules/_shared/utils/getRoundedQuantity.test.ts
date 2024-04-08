// eslint-disable-next-line import/no-unresolved
import { describe, expect, it } from 'bun:test';

import { getRoundedQuantity } from '@utils/getRoundedQuantity';

describe('getRoundedQuantity', () => {
  it('should return an integer value as string if provided value is not a fraction', () => {
    const quantity = getRoundedQuantity(1);

    expect(quantity).toBe('1');
  });

  it('should return a value to two decimal places (as string) if provided value is a fraction', () => {
    const quantity = getRoundedQuantity(1.01);

    expect(quantity).toBe('1.01');
  });
});
