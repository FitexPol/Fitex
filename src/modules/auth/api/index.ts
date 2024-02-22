import { Elysia } from 'elysia';

import { logout } from './logout';
import { signIn } from './signIn';
import { signUp } from './signUp';

export const authApi = new Elysia().group('/auth', (app) => app.use(signUp).use(signIn).use(logout));
