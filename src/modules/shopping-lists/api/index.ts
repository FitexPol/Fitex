import { Elysia } from 'elysia';

import { createShoppingList } from './createShoppingList';
import { deleteShoppingList } from './deleteShoppingList';
import { getIngredientFieldset } from './getIngredientFieldset';
import { getMealFieldset } from './getMealFieldset';
import { toggleFavorite } from './toggleFavorite';
import { updateShoppingList } from './updateShoppingList';

export const shoppingListApi = new Elysia().group('/shopping-lists', (app) =>
  app
    .use(createShoppingList)
    .use(updateShoppingList)
    .use(deleteShoppingList)
    .use(getIngredientFieldset)
    .use(getMealFieldset)
    .use(toggleFavorite),
);
