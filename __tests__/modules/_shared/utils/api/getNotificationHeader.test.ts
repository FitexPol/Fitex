// eslint-disable-next-line import/no-unresolved
import { describe, expect, it } from 'bun:test';

import { getNotificationHeader } from '@utils/api/getNotificationHeader';

describe('getNotificationHeader', () => {
  it('should return an appropriate stringified JSON objects', () => {
    const errorNotificationHeader = getNotificationHeader('error', 'Error message');
    const successNotificationHeader = getNotificationHeader('success', 'Success message');

    expect(errorNotificationHeader).toBe('{"notification":{"type":"error","message":"Error%20message"}}');
    expect(successNotificationHeader).toBe(
      '{"notification":{"type":"success","message":"Success%20message"}}',
    );
  });
});
