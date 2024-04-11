import { t } from 'elysia';

import type { DTO } from '@types';

import { mealSchema } from '../models/meal';

const descriptionOptions = mealSchema.path('description').options;

export const mealDescriptionDTO = t.Object({
  description: t.Optional(
    t.String({
      minLength: descriptionOptions.minlength,
      maxLength: descriptionOptions.maxlength,
      error: 'Meal description must be between 3 and 100 characters long',
    }),
  ),
}) satisfies DTO;
