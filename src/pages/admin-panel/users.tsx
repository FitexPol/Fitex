import { Elysia } from 'elysia';

import { context } from '@/context';
import { getTabs } from '@admin-panel/utils/getTabs';
import { Role } from '@auth/models/user';
import { Document } from '@components/_Document';
import { Tabs } from '@components/Tabs';

export const usersPage = new Elysia().use(context).guard(
  {
    beforeHandle: ({ user, set }) => {
      if (!user!.hasRole(Role.SuperAdmin)) {
        set.redirect = '/admin-panel/products';

        return 'Unauthorized';
      }
    },
  },
  (app) =>
    app.get('/users', ({ user }) => {
      return (
        <Document user={user}>
          <section class="mt-8">
            <Tabs tabs={getTabs(user!)} activeTab="users" />
          </section>
        </Document>
      );
    }),
);
