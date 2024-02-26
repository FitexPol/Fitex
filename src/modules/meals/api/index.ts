import { Elysia } from 'elysia';

import { createMeal } from './createMeal';
import { deleteMeal } from './deleteMeal';
import { toggleFavorite } from './toggleFavorite';
import { updateMeal } from './updateMeal';

export const mealsApi = new Elysia().group('/meals', (app) =>
  app.use(createMeal).use(updateMeal).use(deleteMeal).use(toggleFavorite),
);
