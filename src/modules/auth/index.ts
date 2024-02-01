import { Elysia } from 'elysia';

import { api } from './api';

export const authModule = new Elysia().use(api);
