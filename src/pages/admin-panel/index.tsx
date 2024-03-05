import { Elysia } from 'elysia';

import { context } from '@/context';
import { Role } from '@auth/models/user';

import { categoryPages } from './categories';
import { productPages } from './products';
import { userPages } from './users';

const adminPanelPage = new Elysia().get('', ({ set }) => {
  set.redirect = '/admin-panel/products';
});

export const adminPanelPages = new Elysia().use(context).group('/admin-panel', (app) =>
  app
    .guard(
      {
        beforeHandle: ({ user, set }) => {
          if (!user!.hasRole(Role.Admin, Role.SuperAdmin)) {
            set.redirect = '/';

            return 'Unauthorized';
          }
        },
      },
      (app) => app.use(adminPanelPage).use(productPages).use(categoryPages),
    )
    .use(userPages),
);
