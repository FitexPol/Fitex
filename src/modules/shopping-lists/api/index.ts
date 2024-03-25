import { Elysia } from 'elysia';

import { createShoppingList } from './createShoppingList';
import { deleteShoppingList } from './deleteShoppingList';
import { productsApi } from './products';
import { toggleVisibilityState } from './toggleVisibilityState';
import { updateName } from './updateName';

export const shoppingListsApi = new Elysia().group('/shopping-lists', (app) =>
  app
    .use(createShoppingList)
    .use(deleteShoppingList)
    .group(':id', (app) => app.use(updateName).use(toggleVisibilityState).use(productsApi)),
);
