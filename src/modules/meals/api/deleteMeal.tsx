import { Elysia } from 'elysia';

import { context } from '@/context';
import { ShoppingList } from '@shopping-lists/models/shoppingList';
import { $t } from '@utils/$t';
import { getNotificationHeader } from '@utils/getNotificationHeader';
import { getQueryParams } from '@utils/getQueryParams';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';
import { HxRequestHeader, HxResponseHeader } from '@vars';

import { MealsSection } from '../components/MealsSection';
import { Meal } from '../models/meal';

const _t = $t('meals');
const _tShared = $t('_shared');

export const deleteMeal = new Elysia()
  .use(context)
  .delete('/:id', async ({ user, set, params: { id }, request }) => {
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

    try {
      await mealDoc.deleteOne();

      await ShoppingList.updateMany(
        { 'meals.meal': mealDoc._id },
        { $pull: { meals: { meal: mealDoc._id } } },
      );
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

    if (currentUrl && currentUrl.includes('/meals/')) {
      set.headers[HxResponseHeader.Location] = '/meals';

      return;
    }

    const queryParams = getQueryParams(currentUrl);

    return (
      <MealsSection
        user={user!}
        sortQuery={getQueryParamSecure(queryParams.sort)}
        itemsPerPageQuery={getQueryParamSecure(queryParams.itemsPerPage)}
        pageQuery={getQueryParamSecure(queryParams.page)}
      />
    );
  });
