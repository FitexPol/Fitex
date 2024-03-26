import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { ShoppingListsSection } from '@shopping-lists/components/ShoppingListsSection';

import { shoppingListPages as singleShoppingListPages } from './[id]';
import { nameFormPage } from './nameForm';
import { userContext } from '../context';

const shoppingListsPage = new Elysia().use(userContext).get('', ({ request, user, query }) => {
  return (
    <Document currentUrl={request.url} user={user} isBackButtonVisible={false}>
      <ShoppingListsSection user={user} query={query} />
    </Document>
  );
});

export const shoppingListPages = new Elysia().group('/shopping-lists', (app) =>
  app.use(shoppingListsPage).use(nameFormPage).use(singleShoppingListPages),
);
