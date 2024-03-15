import type { Form, FormErrors } from '@types';

export const updateProductForm = {
  name: {
    type: 'text',
    name: 'name',
    validators: {
      required: true,
      message: 'Product name is required',
    },
  },
  quantity: {
    type: 'number',
    name: 'quantity',
    validators: {
      min: 0,
      message: 'Must be at least 0',
    },
  },
  unit: {
    type: 'text',
    name: 'unit',
    validators: {
      required: true,
      message: 'Unit is required',
    },
  },
} satisfies Form;

export type UpdateProductForm = typeof updateProductForm;
export type UpdateProductFormErrors = FormErrors<UpdateProductForm>;
