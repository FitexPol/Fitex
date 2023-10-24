import { t } from 'elysia';

import type { App } from '@/app';

export const signUp = (app: App) =>
  app.post(
    '/sign-up',
    async ({ body, jwt, setCookie, set }) => {
      const token = await jwt.sign({ email: body.email });

      setCookie('token', token);

      set.redirect = '/';
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    },
  );
