import type { Form, FormErrors } from '@types';

export const signInForm = {
  username: {
    type: 'text',
    name: 'username',
    validators: {
      required: true,
      minLength: 3,
      maxLength: 20,
      message: 'Username must be between 3 and 20 characters long',
    },
  },
  password: {
    type: 'password',
    name: 'password',
    validators: {
      required: true,
      minLength: 6,
      maxLength: 20,
      message: 'Username must be between 6 and 20 characters long',
    },
  },
} satisfies Form;

export type SignInForm = typeof signInForm;
export type SignInFormErrors = FormErrors<SignInForm>;
