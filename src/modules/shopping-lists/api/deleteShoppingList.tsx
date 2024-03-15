import { Elysia } from 'elysia';

import { context } from '@/context';
import { $t } from '@utils/$t';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { getQueryParams } from '@utils/api/getQueryParams';
import { HxRequestHeader, HxResponseHeader } from '@vars';

import { ShoppingListsSection } from '../components/ShoppingListsSection';
import { ShoppingList } from '../models/shoppingList';

export const deleteShoppingList = new Elysia()
  .use(context)
  .delete('/:id', async ({ user, set, params: { id }, request }) => {
    const shoppingListDoc = await ShoppingList.findById(id).exec();

    if (!shoppingListDoc) {
      set.status = 'Not Found';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', $t('errors.notFound'));

      return;
    }

    if (!shoppingListDoc.author._id.equals(user!.id)) {
      set.status = 'Forbidden';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', $t('errors.permissionDenied'));

      return;
    }

    try {
      await shoppingListDoc.deleteOne();
    } catch {
      set.status = 'Bad Request';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', $t('errors.badRequest'));

      return;
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader('success', $t('deleteMeal.success'));

    const currentUrl = request.headers.get(HxRequestHeader.CurrentUrl);

    if (currentUrl && currentUrl.includes('/shopping-lists/')) {
      set.headers[HxResponseHeader.Location] = '/shopping-lists';

      return;
    }

    return <ShoppingListsSection user={user!} query={getQueryParams(currentUrl)} />;
  });
