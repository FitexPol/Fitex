import { jwt } from '@elysiajs/jwt';
import { Elysia } from 'elysia';

import { type JWTUser } from '@auth/models/user';

export const context = new Elysia()
  .use(
    jwt({
      secret: 'secret',
    }),
  )
  .derive(async ({ cookie: { auth }, jwt }) => {
    const user = await jwt.verify(auth.value);

    if (!user) return { user: undefined };

    const jwtUser: JWTUser = {
      id: user.id as string,
      username: user.username as string
    };

    return {
      user: jwtUser,
    };
  });
