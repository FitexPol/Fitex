import { Elysia } from 'elysia';

import { context } from '@/context';
import { HxResponseHeader } from '@vars';

export const logout = new Elysia().use(context).get('/logout', async ({ set, cookie: { auth } }) => {
  auth.remove({ path: '/' });

  set.headers[HxResponseHeader.Location] = '/auth';
});
