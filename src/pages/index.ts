import { Elysia } from 'elysia';

import { setup } from '@/setup';

import { authPage } from './auth';
import { homePage } from './home';

export const pages = new Elysia()
  .use(setup)
  .use(authPage)
  .guard(
    {
      beforeHandle: ({ set, user }) => {
        if (!user) {
          set.redirect = '/auth';

          return 'Unauthorized';
        }
      },
    },
    (app) => app.use(homePage),
  );
