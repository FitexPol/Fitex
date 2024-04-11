import { t } from 'elysia';

import { type TStringOptions } from '@types';

import { userSchema } from '../models/user';

const usernameOptions = userSchema.path('username').options;

export const usernameValidators: TStringOptions = {
  minLength: usernameOptions.minlength,
  maxLength: usernameOptions.maxlength,
  error: 'Username must be between 3 and 20 characters long',
};

export const passwordValidators: TStringOptions = {
  minLength: 6,
  maxLength: 20,
  error: 'Password must be between 6 and 20 characters long',
};

export const signUpDTO = t.Object({
  username: t.String(usernameValidators),
  password: t.String(passwordValidators),
  repeatedPassword: t.String(passwordValidators),
});
