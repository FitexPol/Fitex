import { Elysia } from 'elysia';

import { context } from '@/context';

import { authApi } from './auth/api';
import { homeApi } from './home/api';
import { mealsApi } from './meals/api';
import { shoppingListsApi } from './shopping-lists/api';

export const api = new Elysia().group('/api', (app) =>
  app
    .use(context)
    .use(authApi)
    .guard(
      {
        beforeHandle: ({ user, set }) => {
          if (!user) {
            set.redirect = '/auth';

            return 'Unauthorized';
          }
        },
      },
      (app) => app.use(homeApi).use(mealsApi).use(shoppingListsApi),
    ),
);
