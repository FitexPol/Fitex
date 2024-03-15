import type { Form, FormErrors } from '@types';

export const addMealForm = {
  mealId: {
    type: 'text',
    name: 'mealId',
    validators: {
      required: true,
      message: 'Meal is required',
    },
  },
} satisfies Form;

export type AddMealForm = typeof addMealForm;
export type AddMealFormErrors = FormErrors<AddMealForm>;
