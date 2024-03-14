import { Elysia } from 'elysia';

import { createShoppingList } from './createShoppingList';
import { deleteShoppingList } from './deleteShoppingList';
import { mealsApi } from './meals';
import { productsApi } from './products';
import { updateBasicInformation } from './updateBasicInformation';

export const shoppingListsApi = new Elysia().group('/shopping-lists', (app) =>
  app
    .use(createShoppingList)
    .use(deleteShoppingList)
    .group(':id', (app) => app.use(updateBasicInformation).use(productsApi).use(mealsApi)),
);
