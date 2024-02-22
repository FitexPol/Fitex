import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { ShoppingListSection } from '@shopping-lists/components/ShoppingListSection';

export const shoppingListPage = new Elysia().use(context).get('/:id', async ({ user, params: { id } }) => {
  return (
    <Document user={user}>
      <ShoppingListSection user={user!} shoppingListId={id} />
    </Document>
  );
});
