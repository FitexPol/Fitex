// eslint-disable-next-line import/no-unresolved
import { describe, expect, it } from 'bun:test';

import { getQueryParamSecure } from '@utils/getQueryParamSecure';

describe('getQueryParamSecure', () => {
  it('should return empty string if provided query param is undefined', () => {
    const param = getQueryParamSecure(undefined);

    expect(param).toBe('');
  });

  it('should return first element of an array if provided query param is an array', () => {
    const param = getQueryParamSecure(['param-0', 'param-1']);

    expect(param).toBe('param-0');
  });

  it('should return param converted to a string if query param is provided', () => {
    const param = getQueryParamSecure(0);

    expect(param).toBe('0');
  });
});
