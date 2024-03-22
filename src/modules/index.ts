import { Elysia } from 'elysia';

import { context } from '@/context';
import { type NotificationErrorDetails } from '@errors/NotificationError';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { authApi } from './auth/api';
import { mealsApi } from './meals/api';
import { shoppingListsApi } from './shopping-lists/api';

export const api = new Elysia().group('/api', (app) =>
  app
    .use(context)
    .onError(({ code, error, set }) => {
      let message = error.message;

      switch (code) {
        case 'VALIDATION':
        case 'InlineError':
          return;
        case 'NotificationError': {
          const errorDetails: NotificationErrorDetails = JSON.parse(error.message);

          set.status = errorDetails.status;
          message = errorDetails.message;
        }
      }

      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', message);
    })
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
      (app) => app.use(mealsApi).use(shoppingListsApi),
    ),
);
