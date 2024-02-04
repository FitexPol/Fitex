import type { Form, FormErrors } from '@types';
import { emailMatcher } from '@utils/validators';

export const signInForm = {
  username: {
    type: 'text',
    name: 'username',
    placeholder: 'Username',
    validators: {
      required: true,
      minLength: 3,
      maxLength: 20,
      message: 'Username must be between 3 and 20 characters long',
    },
  },
  email: {
    type: 'email',
    name: 'email',
    placeholder: 'E-mail',
    validators: {
      required: true,
      regex: emailMatcher,
      message: 'E-mail is invalid',
    },
  },
  password: {
    type: 'password',
    name: 'password',
    placeholder: 'Password',
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

export const signUpForm = {
  ...signInForm,
  repeatedPassword: {
    type: 'password',
    name: 'repeatedPassword',
    placeholder: 'Repeat password',
    validators: {
      required: true,
      message: 'This field is required',
    },
  },
} satisfies Form;

export type SignUpForm = typeof signUpForm;
export type SignUpFormErrors = FormErrors<SignUpForm>;
