import { Elysia } from 'elysia';

import { context } from '@/context';
import { $t } from '@utils/$t';
import { getNotificationHeader } from '@utils/getNotificationHeader';
import { getQueryParams } from '@utils/getQueryParams';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';
import { HxRequestHeader, HxResponseHeader } from '@vars';

import { FavoriteMealsSection } from '../components/FavoriteMealsSection';
import { MealSection } from '../components/MealSection';
import { MealsSection } from '../components/MealsSection';
import { Meal } from '../models/meal';

const _t = $t('meals');
const _tShared = $t('_shared');

export const toggleFavorite = new Elysia()
  .use(context)
  .patch('/:id/toggle-favorite', async ({ params: { id }, set, user, request }) => {
    const mealDoc = await Meal.findById(id).exec();

    if (!mealDoc) {
      set.status = 'Not Found';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', _t('_shared.errors.notFound'));

      return;
    }

    if (!mealDoc.author._id.equals(user!.id)) {
      set.status = 'Forbidden';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
        'error',
        _t('_shared.errors.permissionDenied'),
      );

      return;
    }

    mealDoc.isFavorite = !mealDoc.isFavorite;

    try {
      await mealDoc.save();
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
