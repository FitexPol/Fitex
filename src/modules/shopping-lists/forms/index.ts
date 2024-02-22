import { ingredientsForm } from '@/modules/_shared/forms';
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
  meals: [
    {
      type: 'text',
      name: 'meals[].id',
      placeholder: 'shoppingLists.forms.selectMeal',
      validators: {
        required: true,
        message: 'Meal is required',
      },
    },
    {
      type: 'number',
      name: 'meals[].quantity',
      validators: {
        required: true,
        min: 1,
        max: 100,
        message: 'Must be at least 1',
      },
    },
  ],
  ingredients: ingredientsForm,
} satisfies Form;

export type ShoppingListForm = typeof shoppingListForm;
export type ShoppingListFormErrors = FormErrors<ShoppingListForm>;
