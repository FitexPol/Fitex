import { Elysia, t } from 'elysia';

import { Document } from '@components/_Document';
import { ShoppingListAddProductsSection } from '@shopping-lists/components/ShoppingListAddProductsSection';
import { ShoppingListBreadcrumbs } from '@shopping-lists/components/ShoppingListBreadcrumbs';
import { $t } from '@utils/$t';

import { shoppingListContext } from './context';

export const productsPage = new Elysia().use(shoppingListContext).get(
  '/products',
  ({ request, user, shoppingListDoc, query }) => (
    <Document currentUrl={request.url} user={user}>
      <ShoppingListBreadcrumbs
        items={[
          { href: `/${shoppingListDoc.id}`, label: shoppingListDoc.name },
          { href: '/products', label: $t('products.addProducts') },
        ]}
      />
      <ShoppingListAddProductsSection
        user={user}
        shoppingListDoc={shoppingListDoc}
        activeTab={query.tab === 'meals' ? query.tab : 'products'}
      />
    </Document>
  ),
  { query: t.Object({ tab: t.Optional(t.String()) }) },
);
