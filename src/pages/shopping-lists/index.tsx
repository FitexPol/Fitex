import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { ShoppingListsSection } from '@shopping-lists/components/ShoppingListsSection';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

import { shoppingListPages as singleShoppingListPages } from './[id]';
import { basicInformationFormPage } from './basic-information-form';

const shoppingListsPage = new Elysia().use(context).get('', async ({ user, query }) => {
  return (
    <Document user={user}>
      <ShoppingListsSection
        user={user!}
        sortQuery={getQueryParamSecure(query.sort)}
        itemsPerPageQuery={getQueryParamSecure(query.itemsPerPage)}
        pageQuery={getQueryParamSecure(query.page)}
      />
    </Document>
  );
});

export const shoppingListPages = new Elysia().group('/shopping-lists', (app) =>
  app.use(shoppingListsPage).use(basicInformationFormPage).use(singleShoppingListPages),
);
