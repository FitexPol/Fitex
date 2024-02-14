import { Elysia } from 'elysia';

import { context } from '@/context';

import { authPage } from './auth';
import { homePage } from './home';
import { mealsPage } from './meals';

export const pages = new Elysia()
  .use(context)
  .guard(
    {
      beforeHandle: ({ user, set }) => {
        if (user) {
          set.redirect = '/';

          return 'User already logged in';
        }
      },
    },
    (app) => app.use(authPage),
  )
  .guard(
    {
      beforeHandle: ({ user, set }) => {
        if (!user) {
          set.redirect = '/auth';

          return 'Unauthorized';
        }
      },
    },
    (app) => app.use(homePage).use(mealsPage),
  );
