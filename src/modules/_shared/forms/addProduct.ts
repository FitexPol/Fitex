import { type Form } from '@types';

export const addProductForm = {
  name: {
    type: 'text',
    name: 'name',
    validators: {
      required: true,
      message: 'Product name is required',
    },
  },
} satisfies Form;

export type AddProductForm = typeof addProductForm;
