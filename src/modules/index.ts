import { Elysia } from 'elysia';

import { authModule } from './auth';
import { homeModule } from './home';

export const modules = new Elysia().use(authModule).use(homeModule);
