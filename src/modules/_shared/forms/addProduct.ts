import { type Form } from '@types';

export const addProductForm = {
  name: {
    type: 'text',
    name: 'name',
    validators: {
      required: true,
      maxLength: 100,
      message: 'Product name is required',
    },
  },
} satisfies Form;

export type AddProductForm = typeof addProductForm;
