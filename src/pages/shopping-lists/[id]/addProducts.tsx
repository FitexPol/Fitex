import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { ShoppingListAddProductsSection } from '@shopping-lists/components/ShoppingListAddProductsSection';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

import { shoppingListContext } from './context';

export const addProductsPage = new Elysia()
  .use(shoppingListContext)
  .get('/add-products', ({ user, shoppingListDoc, query }) => {
    const tabQuery = getQueryParamSecure(query.tab);

    return (
      <Document user={user}>
        <ShoppingListAddProductsSection
          user={user}
          shoppingListDoc={shoppingListDoc}
          activeTab={tabQuery === 'meals' ? tabQuery : 'products'}
        />
      </Document>
    );
  });
