import { html } from '@elysiajs/html';
import staticPlugin from '@elysiajs/static';
import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import mongoose from 'mongoose';

import { getEnvSecure } from '@utils/getEnvSecure';

import { api } from './modules';
import { pages } from './pages';

const app = new Elysia().use(swagger()).use(staticPlugin()).use(html()).use(pages).use(api);

try {
  await mongoose.connect(
    `mongodb+srv://${getEnvSecure('DB_USER')}:${getEnvSecure(
      'DB_PASSWORD',
    )}@cluster0.vx4xlsk.mongodb.net/fitex?retryWrites=true&w=majority`,
    {
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      },
    },
  );

  app.listen(3000);
  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
} catch (e) {
  console.log(e);
}
