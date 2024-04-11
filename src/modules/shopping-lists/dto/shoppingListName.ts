import { t } from 'elysia';

import { type DTO } from '@types';
import { $t } from '@utils/$t';

import { shoppingListSchema } from '../models/shoppingList';

const nameOptions = shoppingListSchema.path('name').options;

export const shoppingListNameDTO = t.Object({
  name: t.String({
    minLength: nameOptions.minlength,
    maxLength: nameOptions.maxlength,
    error: $t('shoppingLists.errors.mealNameLength'),
  }),
}) satisfies DTO;
