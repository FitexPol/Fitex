import { Elysia } from 'elysia';

import { createMeal } from './createMeal';
import { deleteMeal } from './deleteMeal';
import { getMealFieldset } from './getMealFieldset';
import { updateMeal } from './updateMeal';

export const mealsApi = new Elysia().group('/meals', (app) =>
  app.use(createMeal).use(updateMeal).use(deleteMeal).use(getMealFieldset),
);
