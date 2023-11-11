import cookie from '@elysiajs/cookie';
import { html } from '@elysiajs/html';
import jwt from '@elysiajs/jwt';
import staticPlugin from '@elysiajs/static';
import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';

import { lib } from './lib';

export const app = new Elysia()
  .use(swagger())
  .use(
    jwt({
      secret: 'secret',
    }),
  )
  .use(cookie())
  .use(html())
  .use(staticPlugin())
  .use(lib)
  .derive(async ({ cookie: { token }, jwt }) => {
    const user = await jwt.verify(token);

    return {
      user: user ? user : null,
    };
  });

export type App = typeof app;
