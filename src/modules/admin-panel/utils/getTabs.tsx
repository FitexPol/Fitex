import { Users } from '@auth/components/Users';
import { type JWTUser, Role } from '@auth/models/user';
import { type Tab } from '@components/Tabs';
import { Products } from '@products/components/Products';
import { $t } from '@utils/$t';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

const _t = $t('adminPanel');

export function getTabs(user: JWTUser, query: Record<string, string | undefined>) {
  const tabs = new Map<'products' | 'users', Tab>([
    [
      'products',
      {
        href: '/admin-panel/products',
        label: _t('getTabs.products'),
        component: (
          <Products
            itemsPerPageQuery={getQueryParamSecure(query.itemsPerPage)}
            pageQuery={getQueryParamSecure(query.page)}
          />
        ),
      },
    ],
  ]);

  if (user.hasRole(Role.SuperAdmin)) {
    tabs.set('users', {
      href: '/admin-panel/users',
      label: _t('getTabs.users'),
      component: <Users />,
    });
  }

  return tabs;
}
