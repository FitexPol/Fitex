import { Elysia } from 'elysia';

import { createMeal } from './createMeal';
import { deleteMeal } from './deleteMeal';
import { productsApi } from './products';
import { toggleVisibilityState } from './toggleVisibilityState';
import { updateDescription } from './updateDescription';
import { updateName } from './updateName';

export const mealsApi = new Elysia().group('/meals', (app) =>
  app
    .use(createMeal)
    .use(deleteMeal)
    .group('/:id', (app) =>
      app.use(updateName).use(updateDescription).use(toggleVisibilityState).use(productsApi),
    ),
);
