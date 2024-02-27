import { Elysia } from 'elysia';

import { context } from '@/context';
import { $t } from '@utils/$t';
import { getNotificationHeader } from '@utils/getNotificationHeader';
import { getQueryParams } from '@utils/getQueryParams';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';
import { HxRequestHeader, HxResponseHeader } from '@vars';

import { FavoriteShoppingListsSection } from '../components/FavoriteShoppingListsSection';
import { ShoppingListSection } from '../components/ShoppingListSection';
import { ShoppingListsSection } from '../components/ShoppingListsSection';
import { ShoppingList } from '../models/shoppingList';

const _t = $t('shoppingLists');
const _tShared = $t('_shared');

export const toggleFavorite = new Elysia()
  .use(context)
  .patch('/:id/toggle-favorite', async ({ params: { id }, set, user, request }) => {
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

    shoppingListDoc.isFavorite = !shoppingListDoc.isFavorite;

    try {
      await shoppingListDoc.save();
    } catch {
      set.status = 'Bad Request';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
        'error',
        _tShared('_shared.errors.badRequest'),
      );

      return;
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader('success', _t('toggleFavorite.success'));

    const currentUrl = request.headers.get(HxRequestHeader.CurrentUrl);
    const queryParams = getQueryParams(currentUrl);

    if (currentUrl && currentUrl.includes('/shopping-lists/')) {
      return (
        <ShoppingListSection
          user={user!}
          shoppingListId={shoppingListDoc.id}
          groupByMealsQuery={getQueryParamSecure(queryParams.groupByMeals)}
        />
      );
    }

    if (currentUrl && currentUrl.includes('/shopping-lists')) {
      return (
        <ShoppingListsSection
          user={user!}
          sortQuery={getQueryParamSecure(queryParams.sort)}
          itemsPerPageQuery={getQueryParamSecure(queryParams.itemsPerPage)}
          pageQuery={getQueryParamSecure(queryParams.page)}
        />
      );
    }

    return <FavoriteShoppingListsSection user={user!} />;
  });
