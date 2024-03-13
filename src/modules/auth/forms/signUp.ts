import type { Form, FormErrors } from '@types';

import { signInForm } from './signIn';

export const signUpForm = {
  ...signInForm,
  repeatedPassword: {
    type: 'password',
    name: 'repeatedPassword',
    validators: {
      required: true,
      message: 'This field is required',
    },
  },
} satisfies Form;

export type SignUpForm = typeof signUpForm;
export type SignUpFormErrors = FormErrors<SignUpForm>;
