import { Elysia } from 'elysia';

import { test } from './test';

export const homeApi = new Elysia().group('/home', (app) => app.use(test));
