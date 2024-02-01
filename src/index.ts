import { html } from '@elysiajs/html';
import staticPlugin from '@elysiajs/static';
import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';

import { lib } from './lib';
import { modules } from './modules';
import { pages } from './pages';

const app = new Elysia()
  .use(swagger())
  .use(staticPlugin())
  .use(html())
  .use(lib)
  .use(pages)
  .use(modules)
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
