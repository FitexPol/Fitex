import { Elysia } from 'elysia';

import { getEnvSecure } from '@utils/getEnvSecure';

import { createMeal } from './createMeal';
import { deleteMeal } from './deleteMeal';
import { getIngredientFieldset } from './getIngredientFieldset';
import { toggleFavorite } from './toggleFavorite';
import { updateMeal } from './updateMeal';

export const api = new Elysia().group(`${getEnvSecure('API_PREFIX')}/meals`, (app) =>
  app.use(createMeal).use(updateMeal).use(deleteMeal).use(getIngredientFieldset).use(toggleFavorite),
);
