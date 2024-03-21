import { jwt } from '@elysiajs/jwt';
import { Elysia } from 'elysia';

import { type JWTUser } from '@auth/models/user';
import { InlineError } from '@utils/errors/InlineError';
import { NotificationError } from '@utils/errors/NotificationError';

export const context = new Elysia()
  .use(
    jwt({
      secret: 'secret',
    }),
  )
  .error({ InlineError, NotificationError })
  .derive({ as: 'global' }, async ({ cookie: { auth }, jwt }) => {
    const user = await jwt.verify(auth.value);

    if (!user) return { user: undefined };

    const jwtUser: JWTUser = {
      id: user.id as string,
      username: user.username as string,
    };

    return {
      user: jwtUser,
    };
  });
