import { Elysia } from 'elysia';

import { context } from '@/context';
import { getQueryParams } from '@utils/getQueryParams';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';
import { HxRequestHeader } from '@vars';

import { FavoriteMealsSection } from '../components/FavoriteMealsSection';
import { MealSection } from '../components/MealSection';
import { MealsSection } from '../components/MealsSection';
import { Meal } from '../models/meal';

export const toggleFavorite = new Elysia()
  .use(context)
  .patch('/:id/toggle-favorite', async ({ params: { id }, set, user, request }) => {
    const mealDoc = await Meal.findById(id).exec();

    if (!mealDoc) {
      set.status = 'Not Found';
      throw new Error('Meal not found');
    }

    if (!mealDoc.author._id.equals(user!.id)) {
      set.status = 'Forbidden';
      throw new Error('You are not authorized to update this meal');
    }

    mealDoc.isFavorite = !mealDoc.isFavorite;
    await mealDoc.save();

    const currentUrl = request.headers.get(HxRequestHeader.CurrentUrl);

    if (currentUrl && currentUrl.includes('/meal/')) {
      return <MealSection user={user!} mealId={mealDoc.id} />;
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
