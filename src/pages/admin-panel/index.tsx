import { Elysia } from 'elysia';

import { context } from '@/context';
import { Role } from '@auth/models/user';

import { productsPage } from './products';
import { usersPage } from './users';

const adminPanelPage = new Elysia().get('', ({ set }) => {
  set.redirect = '/admin-panel/products';
});

export const adminPanelPages = new Elysia().use(context).guard(
  {
    beforeHandle: ({ user, set }) => {
      if (!user!.hasRole(Role.Admin, Role.SuperAdmin)) {
        set.redirect = '/';

        return 'Unauthorized';
      }
    },
  },
  (app) => app.group('/admin-panel', (app) => app.use(adminPanelPage).use(productsPage).use(usersPage)),
);
