import { Users } from '@auth/components/Users';
import { type JWTUser, Role } from '@auth/models/user';
import { type Tab } from '@components/Tabs';
import { Products } from '@products/components/Products';
import { $t } from '@utils/$t';

const _t = $t('adminPanel');

export function getTabs(user: JWTUser) {
  const tabs = new Map<'products' | 'users', Tab>([
    [
      'products',
      {
        href: '/admin-panel/products',
        label: _t('getTabs.products'),
        component: <Products />,
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
