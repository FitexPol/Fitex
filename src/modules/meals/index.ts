import { Elysia } from 'elysia';

import { api } from './api';

export const mealsModule = new Elysia().use(api);
