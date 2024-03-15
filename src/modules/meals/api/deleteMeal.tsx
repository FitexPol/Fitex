import { Elysia } from 'elysia';

import { context } from '@/context';
import { ShoppingList } from '@shopping-lists/models/shoppingList';
import { $t } from '@utils/$t';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { getQueryParams } from '@utils/api/getQueryParams';
import { HxRequestHeader, HxResponseHeader } from '@vars';

import { MealsSection } from '../components/MealsSection';
import { Meal } from '../models/meal';

export const deleteMeal = new Elysia()
  .use(context)
  .delete('/:id', async ({ user, set, params: { id }, request }) => {
    const mealDoc = await Meal.findById(id).exec();

    if (!mealDoc) {
      set.status = 'Not Found';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', $t('errors.notFound'));

      return;
    }

    if (!mealDoc.author._id.equals(user!.id)) {
      set.status = 'Forbidden';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', $t('errors.permissionDenied'));

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
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', $t('errors.badRequest'));

      return;
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader('success', $t('deleteMeal.success'));

    const currentUrl = request.headers.get(HxRequestHeader.CurrentUrl);

    if (currentUrl && currentUrl.includes('/meals/')) {
      set.headers[HxResponseHeader.Location] = '/meals';

      return;
    }

    return <MealsSection user={user!} query={getQueryParams(currentUrl)} />;
  });
