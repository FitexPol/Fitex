import Elysia from 'elysia';

import { auth } from './auth';
import { home } from './home';

export const routes = new Elysia().use(auth).use(home);
