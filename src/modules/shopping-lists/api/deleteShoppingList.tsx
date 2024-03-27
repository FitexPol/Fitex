import { Elysia } from 'elysia';

import { NotificationError } from '@errors/NotificationError';
import { $t } from '@utils/$t';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { shoppingListContext } from './context';

export const deleteShoppingList = new Elysia()
  .use(shoppingListContext)
  .delete('', async ({ shoppingListDoc, set }) => {
    try {
      await shoppingListDoc.deleteOne();
    } catch {
      throw new NotificationError('Mongo Error');
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
      'success',
      $t('shoppingLists.deleteMeal.success'),
    );

    set.headers[HxResponseHeader.Location] = '/shopping-lists';
  });
