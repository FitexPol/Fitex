import type { Form, FormErrors } from '@types';

export const mealForm = {
  name: {
    type: 'text',
    name: 'name',
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
    validators: {
      maxLength: 100,
      message: 'Meal description must be between 3 and 100 characters long',
    },
  },
  products: {
    type: 'text',
    name: 'products',
  },
} satisfies Form;

export type MealForm = typeof mealForm;
export type MealFormErrors = FormErrors<MealForm>;
