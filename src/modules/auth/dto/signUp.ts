import { t } from 'elysia';

import type { DTO, TStringOptions } from '@types';
import { $t } from '@utils/$t';

import { userSchema } from '../models/user';

const usernameOptions = userSchema.path('username').options;

export const usernameValidators: TStringOptions = {
  minLength: usernameOptions.minlength,
  maxLength: usernameOptions.maxlength,
  error: $t('auth.errors.usernameLength'),
};

export const passwordValidators: TStringOptions = {
  minLength: 6,
  maxLength: 20,
  error: $t('auth.errors.passwordLength'),
};

export const signUpDTO = t.Object({
  username: t.String(usernameValidators),
  password: t.String(passwordValidators),
  repeatedPassword: t.String(passwordValidators),
}) satisfies DTO;
