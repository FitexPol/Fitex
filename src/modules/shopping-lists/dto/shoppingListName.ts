import { t } from 'elysia';

import { shoppingListSchema } from '../models/shoppingList';

const nameOptions = shoppingListSchema.path('name').options;

export const shoppingListNameDTO = t.Object({
  name: t.String({
    minLength: nameOptions.minlength,
    maxLength: nameOptions.maxlength,
    error: 'Shopping list name must be between 3 and 20 characters long',
  }),
});
