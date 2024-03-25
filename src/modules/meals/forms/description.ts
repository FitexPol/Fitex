import type { Form, FormErrors } from '@types';

export const descriptionForm = {
  description: {
    type: 'text',
    name: 'description',
    validators: {
      maxLength: 100,
      message: 'Meal description must be between 3 and 100 characters long',
    },
  },
} satisfies Form;

export type DescriptionForm = typeof descriptionForm;
export type DescriptionFormErrors = FormErrors<DescriptionForm>;
