import type { Form, FormErrors } from '@types';

export const mealForm = {
  name: {
    type: 'text',
    name: 'name',
    placeholder: 'Name',
    validators: {
      required: true,
      minLength: 3,
      maxLength: 50,
      message: 'Meal name must be between 3 and 20 characters long',
    },
  },
  description: {
    type: 'text',
    name: 'description',
    placeholder: 'Description',
    validators: {
      maxLength: 100,
      message: 'Meal description must be between 3 and 100 characters long',
    },
  },
  ingredients: [
    {
      type: 'text',
      name: 'ingredients[].name',
      placeholder: 'Select an ingredient',
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

export type MealForm = typeof mealForm;
export type MealFormErrors = FormErrors<MealForm>;
