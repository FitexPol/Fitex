import { Elysia } from 'elysia';

import { authModule } from './auth';
import { homeModule } from './home';
import { mealsModule } from './meals';

export const modules = new Elysia().use(authModule).use(homeModule).use(mealsModule);
