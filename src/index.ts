import { html } from '@elysiajs/html';
import { staticPlugin } from '@elysiajs/static';
import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';

import { modules } from './modules';
import { routes } from './routes';

const app = new Elysia()
  .use(swagger())
  .use(staticPlugin())
  .get('/picocss', () => Bun.file(`${import.meta.dir}/../node_modules/@picocss/pico/css/pico.min.css`))
  .get('/htmx', () => Bun.file(`${import.meta.dir}/../node_modules/htmx.org/dist/htmx.min.js`))
  .use(html())
  .use(routes)
  .use(modules);

app.listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
