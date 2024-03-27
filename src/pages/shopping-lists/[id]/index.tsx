import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { ShoppingListBreadcrumbs } from '@shopping-lists/components/ShoppingListBreadcrumbs';
import { ShoppingListEditSection } from '@shopping-lists/components/ShoppingListEditSection';

import { shoppingListContext } from './context';
import { namePage } from './name';
import { productPage } from './product';
import { productsPage } from './products';

const shoppingListPage = new Elysia()
  .use(shoppingListContext)
  .get('', ({ request, shoppingListDoc, user }) => (
    <Document currentUrl={request.url} user={user}>
      <>
        <ShoppingListBreadcrumbs items={[{ href: `/${shoppingListDoc.id}`, label: shoppingListDoc.name }]} />
        <ShoppingListEditSection shoppingListDoc={shoppingListDoc} />
      </>
    </Document>
  ));

export const shoppingListPages = new Elysia().group('/:id', (app) =>
  app.use(shoppingListPage).use(namePage).use(productsPage).use(productPage),
);
