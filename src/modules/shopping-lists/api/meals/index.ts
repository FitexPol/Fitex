import { Elysia } from 'elysia';

import { addMeal } from './addMeal';
import { deleteMeal } from './deleteMeal';
import { updateMeal } from './updateMeal';

export const mealsApi = new Elysia().group('/meals', (app) =>
  app.use(addMeal).use(updateMeal).use(deleteMeal),
);
