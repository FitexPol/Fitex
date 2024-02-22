import { Elysia } from 'elysia';

import { createShoppingList } from './createShoppingList';
import { getIngredientFieldset } from './getIngredientFieldset';
import { getMealFieldset } from './getMealFieldset';

export const shoppingListApi = new Elysia().group('/shopping-lists', (app) =>
  app.use(createShoppingList).use(getIngredientFieldset).use(getMealFieldset),
);
