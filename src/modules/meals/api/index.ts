import { Elysia } from 'elysia';

import { createMeal } from './createMeal';
import { deleteMeal } from './deleteMeal';
import { productsApi } from './products';
import { toggleVisibilityState } from './toggleVisibilityState';
import { updateBasicInformation } from './updateBasicInformation';

export const mealsApi = new Elysia().group('/meals', (app) =>
  app
    .use(createMeal)
    .use(deleteMeal)
    .group('/:id', (app) => app.use(updateBasicInformation).use(toggleVisibilityState).use(productsApi)),
);
