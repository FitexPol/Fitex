import type { Form, FormErrors } from '@types';

export const shoppingListForm = {
  name: {
    type: 'text',
    name: 'name',
    placeholder: '_shared._shared.forms.name',
    validators: {
      required: true,
      minLength: 3,
      maxLength: 50,
      message: 'Shopping list name must be between 3 and 20 characters long',
    },
  },
  meals: {
    type: 'text',
    name: 'meals',
  },
  products: {
    type: 'text',
    name: 'products',
  },
} satisfies Form;

export type ShoppingListForm = typeof shoppingListForm;
export type ShoppingListFormErrors = FormErrors<ShoppingListForm>;
