import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';

import { shoppingListEditPage } from './edit';
import { productFormPage } from './productForm';

const shoppingListPage = new Elysia().use(context).get('', async ({ user }) => {
  return <Document user={user}>Shopping list</Document>;
});

export const shoppingListPages = new Elysia().group('/:id', (app) =>
  app.use(shoppingListPage).use(shoppingListEditPage).use(productFormPage),
);
