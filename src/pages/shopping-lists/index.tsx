import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { ShoppingListsSection } from '@shopping-lists/components/ShoppingListsSection';

import { shoppingListPages as singleShoppingListPages } from './[id]';
import { nameFormPage } from './nameForm';
import { userContext } from '../context';

const shoppingListsPage = new Elysia().use(userContext).get('', async ({ user, query }) => {
  return (
    <Document user={user}>
      <ShoppingListsSection user={user} query={query} />
    </Document>
  );
});

export const shoppingListPages = new Elysia().group('/shopping-lists', (app) =>
  app.use(shoppingListsPage).use(nameFormPage).use(singleShoppingListPages),
);
