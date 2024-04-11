import { t } from 'elysia';

import { type DTO } from '@types';

import { mealSchema } from '../models/meal';

const nameOptions = mealSchema.path('name').options;

export const mealNameDTO = t.Object({
  name: t.String({
    minLength: nameOptions.minlength,
    maxLength: nameOptions.maxlength,
    error: 'Meal name must be between 3 and 20 characters long',
  }),
}) satisfies DTO;
