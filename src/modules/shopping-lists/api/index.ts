import { Elysia } from 'elysia';

import { createShoppingList } from './createShoppingList';
import { deleteShoppingList } from './deleteShoppingList';
import { toggleFavorite } from './toggleFavorite';
import { updateShoppingList } from './updateShoppingList';

export const shoppingListsApi = new Elysia().group('/shopping-lists', (app) =>
  app.use(createShoppingList).use(updateShoppingList).use(deleteShoppingList).use(toggleFavorite),
);
