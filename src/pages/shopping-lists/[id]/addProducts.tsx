import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { ShoppingListAddProductsSection } from '@shopping-lists/components/ShoppingListAddProductsSection';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

import { shoppingListContext } from './context';

export const addProductsPage = new Elysia()
  .use(shoppingListContext)
  .get('/add-products', ({ request, user, shoppingListDoc, query }) => {
    const tabQuery = getQueryParamSecure(query.tab);

    return (
      <Document currentUrl={request.url} user={user}>
        <ShoppingListAddProductsSection
          user={user}
          shoppingListDoc={shoppingListDoc}
          activeTab={tabQuery === 'meals' ? tabQuery : 'products'}
        />
      </Document>
    );
  });
