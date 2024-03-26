import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { ShoppingListEditSection } from '@shopping-lists/components/ShoppingListEditSection';

import { shoppingListContext } from './context';
import { namePage } from './name';
import { productPage } from './product';
import { productsPage } from './products';

const shoppingListPage = new Elysia()
  .use(shoppingListContext)
  .get('', ({ request, shoppingListDoc, user }) => (
    <Document currentUrl={request.url} user={user}>
      <ShoppingListEditSection shoppingListDoc={shoppingListDoc} />
    </Document>
  ));

export const shoppingListPages = new Elysia().group('/:id', (app) =>
  app.use(shoppingListPage).use(namePage).use(productsPage).use(productPage),
);
