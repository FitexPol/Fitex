import { t } from 'elysia';

import { type DTO } from '@types';
import { $t } from '@utils/$t';

import { mealSchema } from '../models/meal';

const nameOptions = mealSchema.path('name').options;

export const mealNameDTO = t.Object({
  name: t.String({
    minLength: nameOptions.minlength,
    maxLength: nameOptions.maxlength,
    error: $t('meals.errors.mealNameLength'),
  }),
}) satisfies DTO;
