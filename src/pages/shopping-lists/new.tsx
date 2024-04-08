import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { CardSection } from '@components/sections/CardSection';
import { NameForm } from '@shopping-lists/components/forms/NameForm';
import { ShoppingListBreadcrumbs } from '@shopping-lists/components/ShoppingListBreadcrumbs';
import { $t } from '@utils/$t';

import { userContext } from '../context';

export const newPage = new Elysia().use(userContext).get('/new', ({ request, user }) => (
  <Document currentUrl={request.url} user={user}>
    <ShoppingListBreadcrumbs items={[{ href: '/new', label: $t('shoppingLists.createShoppingList') }]} />

    <CardSection title={$t('shoppingLists.createShoppingList')}>
      <NameForm />
    </CardSection>
  </Document>
));
