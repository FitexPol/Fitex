import { Elysia } from 'elysia';

import { context } from '@/context';
import { PageNotPermittedError } from '@errors/PageNotPermitted';

export const userContext = new Elysia().use(context).derive({ as: 'scoped' }, ({ user }) => {
  if (!user) throw new PageNotPermittedError();

  return { user };
});
