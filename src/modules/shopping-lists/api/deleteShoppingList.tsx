import { Elysia } from 'elysia';

import { context } from '@/context';
import { getQueryParams } from '@utils/getQueryParams';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';
import { HxRequestHeader, HxResponseHeader } from '@vars';

import { FavoriteShoppingListsSection } from '../components/FavoriteShoppingListsSection';
import { ShoppingListsSection } from '../components/ShoppingListsSection';
import { ShoppingList } from '../models/shoppingList';

export const deleteShoppingList = new Elysia()
  .use(context)
  .delete('/:id', async ({ user, set, params: { id }, request }) => {
    const shoppingListDoc = await ShoppingList.findById(id).exec();

    if (!shoppingListDoc) {
      set.status = 'Not Found';
      throw new Error('Shopping list not found');
    }

    if (!shoppingListDoc.author._id.equals(user!.id)) {
      set.status = 'Forbidden';
      throw new Error('You are not authorized to update this shopping list');
    }

    try {
      await shoppingListDoc.deleteOne();
    } catch {
      set.status = 'Bad Request';
      throw new Error('Failed to update meal');
    }

    const currentUrl = request.headers.get(HxRequestHeader.CurrentUrl);

    if (currentUrl && currentUrl.includes('/shopping-lists/')) {
      set.headers = {
        [HxResponseHeader.Location]: '/shopping-lists',
      };

      return;
    }

    if (currentUrl && currentUrl.includes('/shopping-lists')) {
      const queryParams = getQueryParams(currentUrl);

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
