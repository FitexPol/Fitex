import { Elysia } from 'elysia';
import { html } from '@elysiajs/html';
import { staticPlugin } from '@elysiajs/static';

import { routes } from './routes';
import { homeModule } from './modules/home';

const app = new Elysia().use(staticPlugin()).use(html()).use(routes).use(homeModule).listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
