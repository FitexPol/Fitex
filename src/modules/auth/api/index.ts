import { Elysia } from 'elysia';

import { getEnvSecure } from '@utils/getEnvSecure';

import { logout } from './logout';
import { signIn } from './signIn';
import { signUp } from './signUp';

export const api = new Elysia().group(`${getEnvSecure('API_PREFIX')}/auth`, (app) =>
  app.use(signUp).use(signIn).use(logout),
);
