import type { Form, FormErrors } from '@types';

export const productForm = {
  ['pl-PL']: {
    type: 'text',
    name: 'pl-PL',
    validators: {
      required: true,
      minLength: 3,
      maxLength: 50,
      message: 'Polska nazwa produktu musi zawierać od 3 do 20 znaków',
    },
  },
  category: {
    type: 'text',
    name: 'category',
  },
} satisfies Form;

export type ProductForm = typeof productForm;
export type ProductFormErrors = FormErrors<ProductForm>;
