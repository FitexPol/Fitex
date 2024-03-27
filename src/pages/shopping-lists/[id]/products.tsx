import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { ShoppingListAddProductsSection } from '@shopping-lists/components/ShoppingListAddProductsSection';
import { ShoppingListBreadcrumbs } from '@shopping-lists/components/ShoppingListBreadcrumbs';
import { $t } from '@utils/$t';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

import { shoppingListContext } from './context';

export const productsPage = new Elysia()
  .use(shoppingListContext)
  .get('/products', ({ request, user, shoppingListDoc, query }) => {
    const tabQuery = getQueryParamSecure(query.tab);

    return (
      <Document currentUrl={request.url} user={user}>
        <>
          <ShoppingListBreadcrumbs
            items={[
              { href: `/${shoppingListDoc.id}`, label: shoppingListDoc.name },
              { href: '/products', label: $t('products.addProducts') },
            ]}
          />
          <ShoppingListAddProductsSection
            user={user}
            shoppingListDoc={shoppingListDoc}
            activeTab={tabQuery === 'meals' ? tabQuery : 'products'}
          />
        </>
      </Document>
    );
  });
