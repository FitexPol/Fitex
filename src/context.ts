import { jwt } from '@elysiajs/jwt';
import { Elysia } from 'elysia';

import { type User } from '@auth/models/user';

export const context = new Elysia()
  .use(
    jwt({
      secret: 'secret',
    }),
  )
  .derive(async ({ cookie: { auth }, jwt }) => {
    const user = await jwt.verify(auth.value);

    return {
      user: user ? (user as unknown as User) : null,
    };
  });
