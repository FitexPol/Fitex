import { Elysia } from 'elysia';

import { createMeal } from './createMeal';
import { deleteMeal } from './deleteMeal';
import { productsApi } from './products';
import { updateDescription } from './updateDescription';
import { updateName } from './updateName';

export const mealsApi = new Elysia().group('/meals', (app) =>
  app
    .use(createMeal)
    .group('/:id', (app) => app.use(deleteMeal).use(updateName).use(updateDescription).use(productsApi)),
);
