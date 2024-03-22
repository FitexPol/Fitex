import { Elysia } from 'elysia';

import { context } from '@/context';
import { NotificationError } from '@errors/NotificationError';

export const userContext = new Elysia().use(context).derive({ as: 'scoped' }, ({ user }) => {
  if (!user) throw new NotificationError('Permission Denied');

  return { user };
});
