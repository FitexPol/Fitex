// eslint-disable-next-line import/no-unresolved
import { describe, expect, it } from 'bun:test';

import { getSkipValue } from '@utils/pagination/getSkipValue';

describe('getSkipValue', () => {
  it('should return an appropriate skip value', () => {
    const skipValue = getSkipValue(2, 10);

    expect(skipValue).toBe(10);
  });
});
