// eslint-disable-next-line import/no-unresolved
import { describe, expect, it } from 'bun:test';

import { getPath } from '@utils/getPath';

describe('getPath', () => {
  it('should return path without query params if query argument is not provided', () => {
    const url = '/test/path';
    const path = getPath(url);

    expect(path).toBe(url);
  });

  it('should return path with query params if query argument is provided', () => {
    const url = '/test/path';
    const path = getPath(url, { testQuery: 'testValue', testQuery2: '' });

    expect(path).toBe(`${url}?testQuery=testValue`);
  });
});
