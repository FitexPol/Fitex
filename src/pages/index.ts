import { Elysia } from 'elysia';

import { context } from '@/context';

import { authPage } from './auth';
import { mealPages } from './meals';
import { shoppingListPages } from './shopping-lists';

export const pages = new Elysia()
  .use(context)
  .use(authPage)
  .guard(
    {
      beforeHandle: ({ user, set }) => {
        if (!user) {
          set.redirect = '/auth';

          return 'Unauthenticated';
        }
      },
    },
    (app) =>
      app
        .use(shoppingListPages)
        .use(mealPages)
        .get('/', ({ set }) => {
          set.redirect = '/shopping-lists';
        }),
  );
