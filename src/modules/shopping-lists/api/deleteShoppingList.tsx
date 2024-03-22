import { Elysia } from 'elysia';

import { NotificationError } from '@errors/NotificationError';
import { $t } from '@utils/$t';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { getQueryParams } from '@utils/api/getQueryParams';
import { HxRequestHeader, HxResponseHeader } from '@vars';

import { shoppingListContext } from './context';
import { ShoppingListsSection } from '../components/ShoppingListsSection';

export const deleteShoppingList = new Elysia()
  .use(shoppingListContext)
  .delete('/:id', async ({ shoppingListDoc, user, set, request }) => {
    try {
      await shoppingListDoc.deleteOne();
    } catch {
      throw new NotificationError('Mongo Error');
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
      'success',
      $t('shoppingLists.deleteMeal.success'),
    );

    const currentUrl = request.headers.get(HxRequestHeader.CurrentUrl);

    if (currentUrl && currentUrl.includes('/shopping-lists/')) {
      set.headers[HxResponseHeader.Location] = '/shopping-lists';

      return;
    }

    return <ShoppingListsSection user={user} query={getQueryParams(currentUrl)} />;
  });
