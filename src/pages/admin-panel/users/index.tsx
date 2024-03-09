import { Elysia } from 'elysia';

import { context } from '@/context';
import { Users } from '@auth/components/Users';
import { Document } from '@components/_Document';
import { type Tab, Tabs } from '@components/Tabs';
import { $t } from '@utils/$t';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

import { userFormPage } from './form';

const _t = $t('auth');

const usersPage = new Elysia().use(context).get('', ({ user, query }) => {
  const tabs = new Map<'products' | 'categories' | 'users', Tab>([
    [
      'users',
      {
        href: '/admin-panel/users',
        label: _t('usersPage.title'),
        component: (
          <Users
            usernameQuery={getQueryParamSecure(query.username)}
            rolesQuery={getQueryParamSecure(query.roles)}
            sortQuery={getQueryParamSecure(query.sort)}
            itemsPerPageQuery={getQueryParamSecure(query.itemsPerPage)}
            pageQuery={getQueryParamSecure(query.page)}
          />
        ),
      },
    ],
  ]);

  return (
    <Document user={user}>
      <section class="mt-8">
        <Tabs tabs={tabs} activeTab="users" />
      </section>
    </Document>
  );
});

export const userPages = new Elysia()
  .use(context)
  .group('/users', (app) => app.use(usersPage).use(userFormPage));
