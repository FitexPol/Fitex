import { Elysia } from 'elysia';

import { context } from '@/context';
import { $t } from '@utils/$t';
import { NotificationError } from '@utils/errors/NotificationError';

import { ShoppingList } from '../models/shoppingList';

export const shoppingListContext = new Elysia()
  .use(context)
  .derive({ as: 'scoped' }, async ({ params: { id }, user }) => {
    const shoppingListDoc = await ShoppingList.findById(id).exec();

    if (!shoppingListDoc) throw new NotificationError({ status: 404, message: $t('_errors.notFound') });

    if (!shoppingListDoc.author._id.equals(user!.id))
      throw new NotificationError({ status: 403, message: $t('_errors.permissionDenied') });

    return {
      shoppingListDoc,
    };
  });
