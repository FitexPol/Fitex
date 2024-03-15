import type { Form, FormErrors } from '@types';

export const updateMealForm = {
  mealId: {
    type: 'text',
    name: 'mealId',
    validators: {
      required: true,
      message: 'Meal is required',
    },
  },
  quantity: {
    type: 'number',
    name: 'quantity',
    validators: {
      required: true,
      min: 0,
      message: 'Must be at least 0',
    },
  },
} satisfies Form;

export type UpdateMealForm = typeof updateMealForm;
export type UpdateMealFormErrors = FormErrors<UpdateMealForm>;
