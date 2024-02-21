import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { ShoppingListFormSection } from '@shopping-lists/components/ShoppingListFormSection';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

export const shoppingListFormPage = new Elysia().use(context).get('/form', async ({ user, query }) => {
  return (
    <Document user={user}>
      <ShoppingListFormSection user={user!} shoppingListId={getQueryParamSecure(query.shoppingListId)} />
    </Document>
  );
});
