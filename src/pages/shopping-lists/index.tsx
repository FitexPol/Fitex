import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { ShoppingListBreadcrumbs } from '@shopping-lists/components/ShoppingListBreadcrumbs';
import { ShoppingListsSection } from '@shopping-lists/components/ShoppingListsSection';

import { shoppingListPages as singleShoppingListPages } from './[id]';
import { newPage } from './new';
import { userContext } from '../context';

const shoppingListsPage = new Elysia().use(userContext).get('', ({ request, user, query }) => (
  <Document currentUrl={request.url} user={user} isBackButtonVisible={false}>
    <ShoppingListBreadcrumbs />
    <ShoppingListsSection user={user} query={query} />
  </Document>
));

export const shoppingListPages = new Elysia().group('/shopping-lists', (app) =>
  app.use(shoppingListsPage).use(newPage).use(singleShoppingListPages),
);
