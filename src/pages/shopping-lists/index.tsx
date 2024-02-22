import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { ShoppingListsSection } from '@shopping-lists/components/ShoppingListsSection';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

import { shoppingListPage } from './[id]';
import { shoppingListFormPage } from './form';

export const shoppingListPages = new Elysia().use(context).group('/shopping-lists', (app) =>
  app
    .get('', async ({ user, query }) => {
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
    })
    .use(shoppingListPage)
    .use(shoppingListFormPage),
);
