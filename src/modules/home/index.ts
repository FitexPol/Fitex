import Elysia from 'elysia';

import { api } from './api';

export const homeModule = new Elysia().use(api);
