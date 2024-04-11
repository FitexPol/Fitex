import { t } from 'elysia';

import type { DTO } from '@types';
import { $t } from '@utils/$t';

import { mealSchema } from '../models/meal';

const descriptionOptions = mealSchema.path('description').options;

export const mealDescriptionDTO = t.Object({
  description: t.Optional(
    t.String({
      minLength: descriptionOptions.minlength,
      maxLength: descriptionOptions.maxlength,
      error: $t('meals.errors.mealDescriptionLength'),
    }),
  ),
}) satisfies DTO;
