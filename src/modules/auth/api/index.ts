import { Elysia } from 'elysia';

import { getEnvSecure } from '@utils/getEnvSecure';

import { signUp } from './signUp';

export const api = new Elysia().group(getEnvSecure('API_PREFIX'), (app) => app.use(signUp));
