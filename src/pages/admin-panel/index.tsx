import { Elysia } from 'elysia';

import { context } from '@/context';
import { Role } from '@auth/models/user';

import { userPages } from './users';

const adminPanelPage = new Elysia().get('', ({ set }) => {
  set.redirect = '/admin-panel/users';
});

export const adminPanelPages = new Elysia().use(context).group('/admin-panel', (app) =>
  app.guard(
    {
      beforeHandle: ({ user, set }) => {
        if (!user!.hasRole(Role.Admin)) {
          set.redirect = '/';

          return 'Unauthorized';
        }
      },
    },
    (app) => app.use(adminPanelPage).use(userPages),
  ),
);
