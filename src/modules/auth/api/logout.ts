import { Elysia } from 'elysia';

import { context } from '@/context';
import { HxResponseHeader } from '@vars';

export const logout = new Elysia().use(context).get('/logout', async ({ set, cookie: { auth } }) => {
  // TODO: remove when elysia bug is fixed
  auth.path = '/';
  auth.remove();
  set.headers[HxResponseHeader.Location] = '/auth';
});
