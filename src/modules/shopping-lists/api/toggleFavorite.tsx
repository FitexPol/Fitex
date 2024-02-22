import { Elysia } from 'elysia';

import { context } from '@/context';
import { getQueryParams } from '@utils/getQueryParams';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';
import { HxRequestHeader } from '@vars';

import { FavoriteShoppingListsSection } from '../components/FavoriteShoppingListsSection';
import { ShoppingListSection } from '../components/ShoppingListSection';
import { ShoppingListsSection } from '../components/ShoppingListsSection';
import { ShoppingList } from '../models/shoppingList';

export const toggleFavorite = new Elysia()
  .use(context)
  .patch('/:id/toggle-favorite', async ({ params: { id }, set, user, request }) => {
    const shoppingListDoc = await ShoppingList.findById(id).exec();

    if (!shoppingListDoc) {
      set.status = 'Not Found';
      throw new Error('Shopping list not found');
    }

    if (!shoppingListDoc.author._id.equals(user!.id)) {
      set.status = 'Forbidden';
      throw new Error('You are not authorized to update this shopping list');
    }

    shoppingListDoc.isFavorite = !shoppingListDoc.isFavorite;
    await shoppingListDoc.save();

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
