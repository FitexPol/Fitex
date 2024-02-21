import { Elysia } from 'elysia';

import { api } from './api';

export const shoppingListsModule = new Elysia().use(api);
