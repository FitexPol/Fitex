import { Elysia } from 'elysia';

import { context } from '@/context';

import { adminPanelPages } from './admin-panel';
import { authPage } from './auth';
import { homePage } from './home';
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
    (app) => app.use(homePage).use(shoppingListPages).use(mealPages).use(adminPanelPages),
  );
