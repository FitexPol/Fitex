import { jwt } from '@elysiajs/jwt';
import { Elysia } from 'elysia';

import type { JWTUser, Role } from '@auth/models/user';

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
      username: user.username as string,
      roles: (user.roles as string).split(',') as Role[],
      hasRole: function (...roles: Role[]) {
        return roles.some((role) => this.roles.includes(role));
      },
    };

    return {
      user: jwtUser,
    };
  });
