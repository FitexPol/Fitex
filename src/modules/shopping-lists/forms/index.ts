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
  ingredients: [
    {
      type: 'text',
      name: 'ingredients[].name',
      placeholder: '_shared._shared.forms.selectIngredient',
      validators: {
        required: true,
        message: 'Ingredient name is required',
      },
    },
    {
      type: 'number',
      name: 'ingredients[].quantity',
      validators: {
        required: true,
        min: 1,
        max: 100,
        message: 'Must be at least 1',
      },
    },
    {
      type: 'text',
      name: 'ingredients[].unit',
      validators: {
        required: true,
        message: 'Unit is required',
      },
    },
  ],
} satisfies Form;

export type ShoppingListForm = typeof shoppingListForm;
export type ShoppingListFormErrors = FormErrors<ShoppingListForm>;
