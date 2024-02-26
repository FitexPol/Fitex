import { Elysia } from 'elysia';

import { context } from '@/context';
import { ShoppingList } from '@shopping-lists/models/shoppingList';
import { getQueryParams } from '@utils/getQueryParams';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';
import { HxRequestHeader, HxResponseHeader } from '@vars';

import { FavoriteMealsSection } from '../components/FavoriteMealsSection';
import { MealsSection } from '../components/MealsSection';
import { Meal } from '../models/meal';

export const deleteMeal = new Elysia()
  .use(context)
  .delete('/:id', async ({ user, set, params: { id }, request }) => {
    const mealDoc = await Meal.findById(id).exec();

    if (!mealDoc) {
      set.status = 'Not Found';
      throw new Error('Meal not found');
    }

    if (!mealDoc.author._id.equals(user!.id)) {
      set.status = 'Forbidden';
      throw new Error('You are not authorized to delete this meal');
    }

    try {
      await mealDoc.deleteOne();

      await ShoppingList.updateMany(
        { 'meals.meal': mealDoc._id },
        { $pull: { meals: { meal: mealDoc._id } } },
      );
    } catch {
      set.status = 'Bad Request';
      throw new Error('Failed to delete meal');
    }

    const currentUrl = request.headers.get(HxRequestHeader.CurrentUrl);

    if (currentUrl && currentUrl.includes('/meals/')) {
      set.headers = {
        [HxResponseHeader.Location]: '/meals',
      };

      return;
    }

    if (currentUrl && currentUrl.includes('/meals')) {
      const queryParams = getQueryParams(currentUrl);

      return (
        <MealsSection
          user={user!}
          sortQuery={getQueryParamSecure(queryParams.sort)}
          itemsPerPageQuery={getQueryParamSecure(queryParams.itemsPerPage)}
          pageQuery={getQueryParamSecure(queryParams.page)}
        />
      );
    }

    return <FavoriteMealsSection user={user!} />;
  });
