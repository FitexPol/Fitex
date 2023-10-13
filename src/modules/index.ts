import Elysia from 'elysia';

import { homeModule } from './home';

export const modules = new Elysia().use(homeModule);
