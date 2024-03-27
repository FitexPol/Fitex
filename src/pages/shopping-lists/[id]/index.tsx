import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { Breadcrumbs } from '@components/Breadcrumbs';
import { ShoppingListEditSection } from '@shopping-lists/components/ShoppingListEditSection';
import { getBreadcrumbs } from '@shopping-lists/utils/getBreadcrumbs';

import { shoppingListContext } from './context';
import { namePage } from './name';
import { productPage } from './product';
import { productsPage } from './products';

const shoppingListPage = new Elysia()
  .use(shoppingListContext)
  .get('', ({ request, shoppingListDoc, user }) => (
    <Document currentUrl={request.url} user={user}>
      <>
        <Breadcrumbs
          items={getBreadcrumbs([{ href: `/${shoppingListDoc.id}`, label: shoppingListDoc.name }])}
        />
        <ShoppingListEditSection shoppingListDoc={shoppingListDoc} />
      </>
    </Document>
  ));

export const shoppingListPages = new Elysia().group('/:id', (app) =>
  app.use(shoppingListPage).use(namePage).use(productsPage).use(productPage),
);
