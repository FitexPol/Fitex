import { jwt } from '@elysiajs/jwt';
import { Elysia } from 'elysia';

import { type JWTUser } from '@auth/models/user';
import { InlineError } from '@errors/InlineError';
import { NotificationError } from '@errors/NotificationError';
import { PageNotFoundError } from '@errors/PageNotFoundError';
import { PageNotPermittedError } from '@errors/PageNotPermitted';

export const context = new Elysia()
  .error({ InlineError, NotificationError, PageNotFoundError, PageNotPermittedError })
  .use(
    jwt({
      secret: 'secret',
    }),
  )
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
