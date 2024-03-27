import type { Form, FormErrors } from '@types';

export const nameForm = {
  name: {
    type: 'text',
    name: 'name',
    validators: {
      required: true,
      minLength: 3,
      maxLength: 100,
      message: 'Meal name must be between 3 and 20 characters long',
    },
  },
} satisfies Form;

export type NameForm = typeof nameForm;
export type NameFormErrors = FormErrors<NameForm>;
