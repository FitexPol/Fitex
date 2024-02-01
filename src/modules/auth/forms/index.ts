import type { Form, FormErrors } from '@types';

export const signUpForm = {
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
      minLength: 3,
      regex:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
