import { Elysia } from 'elysia';

import { context } from '@/context';
import { $t } from '@utils/$t';
import { getNotificationHeader } from '@utils/getNotificationHeader';
import { getQueryParams } from '@utils/getQueryParams';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';
import { HxRequestHeader, HxResponseHeader } from '@vars';

import { ShoppingListsSection } from '../components/ShoppingListsSection';
import { ShoppingList } from '../models/shoppingList';

const _t = $t('shoppingLists');
const _tShared = $t('_shared');

export const deleteShoppingList = new Elysia()
  .use(context)
  .delete('/:id', async ({ user, set, params: { id }, request }) => {
    const shoppingListDoc = await ShoppingList.findById(id).exec();

    if (!shoppingListDoc) {
      set.status = 'Not Found';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', _t('_shared.errors.notFound'));

      return;
    }

    if (!shoppingListDoc.author._id.equals(user!.id)) {
      set.status = 'Forbidden';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
        'error',
        _t('_shared.errors.permissionDenied'),
      );

      return;
    }

    try {
      await shoppingListDoc.deleteOne();
    } catch {
      set.status = 'Bad Request';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
        'error',
        _tShared('_shared.errors.badRequest'),
      );

      return;
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader('success', _t('deleteMeal.success'));

    const currentUrl = request.headers.get(HxRequestHeader.CurrentUrl);

    if (currentUrl && currentUrl.includes('/shopping-lists/')) {
      set.headers[HxResponseHeader.Location] = '/shopping-lists';

      return;
    }

    const queryParams = getQueryParams(currentUrl);

    return (
      <ShoppingListsSection
        user={user!}
        sortQuery={getQueryParamSecure(queryParams.sort)}
        itemsPerPageQuery={getQueryParamSecure(queryParams.itemsPerPage)}
        pageQuery={getQueryParamSecure(queryParams.page)}
      />
    );
  });
