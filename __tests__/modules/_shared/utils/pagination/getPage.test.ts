// eslint-disable-next-line import/no-unresolved
import { describe, expect, it } from 'bun:test';

import { getPage } from '@utils/pagination/getPage';

describe('getPage', () => {
  it('should return an appropriate page as number if provided argument is a number higher than 0', () => {
    const page = getPage('1');

    expect(page).toBe(1);
  });

  it('should return 1 if provided argument is lower than 1', () => {
    const page = getPage('-1');

    expect(page).toBe(1);
  });

  it('should return 1 if provided argument is not a number', () => {
    const page = getPage('');

    expect(page).toBe(1);
  });
});
