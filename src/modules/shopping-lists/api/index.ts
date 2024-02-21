import { Elysia } from 'elysia';

import { getEnvSecure } from '@utils/getEnvSecure';

import { getIngredientFieldset } from './getIngredientFieldset';

export const api = new Elysia().group(`${getEnvSecure('API_PREFIX')}/shopping-lists`, (app) =>
  app.use(getIngredientFieldset),
);
