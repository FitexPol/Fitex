import { t } from 'elysia';

import { type DTO } from '@types';

import { passwordValidators, usernameValidators } from './signUp';

export const signInDTO = t.Object({
  username: t.String(usernameValidators),
  password: t.String(passwordValidators),
}) satisfies DTO;
