import type { App } from '@/app';

import { auth } from './auth';
import { home } from './home';

export const views = (app: App) =>
  app
    .guard(
      {
        beforeHandle: ({ set, user }) => {
          if (!user) {
            set.redirect = '/auth';
          }
        },
      },
      (app) => app.use(home),
    )
    .use(auth);
