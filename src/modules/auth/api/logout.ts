import { Elysia } from 'elysia';

import { context } from '@/context';

export const logout = new Elysia().use(context).get('/logout', async ({ set, cookie: { auth } }) => {
  auth.remove({ path: '/' });

  set.headers = { 'Hx-Location': '/auth' };
});
