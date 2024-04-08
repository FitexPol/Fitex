/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Elysia } from 'elysia';

import { context } from '@/context';
import { NotificationError } from '@errors/NotificationError';

export const userContext = (app: Elysia) =>
  app.use(context).derive({ as: 'scoped' }, ({ user }) => {
    if (!user) throw new NotificationError('Permission Denied');

    return { user };
  });
