import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { Breadcrumbs } from '@components/Breadcrumbs';
import { ShoppingListsSection } from '@shopping-lists/components/ShoppingListsSection';
import { getBreadcrumbs } from '@shopping-lists/utils/getBreadcrumbs';

import { shoppingListPages as singleShoppingListPages } from './[id]';
import { newPage } from './new';
import { userContext } from '../context';

const shoppingListsPage = new Elysia().use(userContext).get('', ({ request, user, query }) => (
  <Document currentUrl={request.url} user={user} isBackButtonVisible={false}>
    <>
      <Breadcrumbs items={getBreadcrumbs()} />
      <ShoppingListsSection user={user} query={query} />
    </>
  </Document>
));

export const shoppingListPages = new Elysia().group('/shopping-lists', (app) =>
  app.use(shoppingListsPage).use(newPage).use(singleShoppingListPages),
);
