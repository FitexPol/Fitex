import { Elysia } from 'elysia';

import { getEnvSecure } from '@utils/getEnvSecure';

import { test } from './test';

export const api = new Elysia().group(`${getEnvSecure('API_PREFIX')}/home`, (app) => app.use(test));
