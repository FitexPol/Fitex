/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Elysia } from 'elysia';

import { context } from '@/context';
import { PageNotPermittedError } from '@errors/PageNotPermitted';

export const userContext = (app: Elysia) =>
  app.use(context).derive({ as: 'scoped' }, ({ user }) => {
    if (!user) throw new PageNotPermittedError();

    return { user };
  });
