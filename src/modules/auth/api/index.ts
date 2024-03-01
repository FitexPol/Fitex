import { Elysia } from 'elysia';

import { getUserModal } from './getUserModal';
import { logout } from './logout';
import { signIn } from './signIn';
import { signUp } from './signUp';
import { updateUser } from './updateUser';
import { Role } from '../models/user';

export const authApi = new Elysia().group('/auth', (app) =>
  app
    .use(signUp)
    .use(signIn)
    .use(logout)
    .guard(
      {
        beforeHandle: ({ user, set }) => {
          if (!user!.hasRole(Role.SuperAdmin)) {
            set.redirect = '/';

            return 'Unauthorized';
          }
        },
      },
      (app) => app.group('/users', (app) => app.use(getUserModal).use(updateUser)),
    ),
);
