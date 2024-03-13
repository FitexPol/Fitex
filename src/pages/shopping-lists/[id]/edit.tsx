import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { ShoppingListEditSection } from '@shopping-lists/components/ShoppingListEditSection';

export const shoppingListEditPage = new Elysia().use(context).get('/edit', ({ user, params: { id } }) => (
  <Document user={user}>
    <ShoppingListEditSection user={user!} shoppingListId={id} />
  </Document>
));
