import { type Form } from '@types';

export const addProductForm = {
  name: {
    type: 'text',
    name: 'name',
    placeholder: '_shared.editSection.addProduct.placeholder',
    validators: {
      required: true,
      message: 'Product name is required',
    },
  },
} satisfies Form;

export type AddProductForm = typeof addProductForm;
