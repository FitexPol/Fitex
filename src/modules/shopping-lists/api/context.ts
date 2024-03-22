/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Elysia } from 'elysia';

import { userContext } from '@auth/api/context';
import { NotificationError } from '@errors/NotificationError';

import { ShoppingList } from '../models/shoppingList';

export const shoppingListContext = (app: Elysia) =>
  app.use(userContext).derive({ as: 'scoped' }, async ({ params: { id }, user }) => {
    const shoppingListDoc = await ShoppingList.findById(id).exec();

    if (!shoppingListDoc) throw new NotificationError('Not Found');

    if (!shoppingListDoc.author._id.equals(user.id)) throw new NotificationError('Permission Denied');

    return {
      shoppingListDoc,
      user,
    } as const;
  });
