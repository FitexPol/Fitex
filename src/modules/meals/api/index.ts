import { Elysia } from 'elysia';

import { getEnvSecure } from '@utils/getEnvSecure';

import { createMeal } from './createMeal';
import { deleteMeal } from './deleteMeal';
import { getIngredientFieldset } from './getIngredientFieldset';
import { getMealModal } from './getMealModal';
import { updateMeal } from './updateMeal';

export const api = new Elysia().group(`${getEnvSecure('API_PREFIX')}/meals`, (app) =>
  app.use(getMealModal).use(createMeal).use(updateMeal).use(deleteMeal).use(getIngredientFieldset),
);
