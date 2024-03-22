import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { ShoppingListEditSection } from '@shopping-lists/components/ShoppingListEditSection';

import { shoppingListContext } from './context';
import { productFormPage } from './productForm';

const shoppingListPage = new Elysia().use(shoppingListContext).get('', async ({ shoppingListDoc, user }) => {
  return (
    <Document user={user}>
      <ShoppingListEditSection user={user} shoppingListDoc={shoppingListDoc} />
    </Document>
  );
});

export const shoppingListPages = new Elysia().group('/:id', (app) =>
  app.use(shoppingListPage).use(productFormPage),
);
