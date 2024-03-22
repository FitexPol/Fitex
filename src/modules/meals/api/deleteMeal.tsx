import { Elysia } from 'elysia';

import { NotificationError } from '@errors/NotificationError';
import { ShoppingList } from '@shopping-lists/models/shoppingList';
import { $t } from '@utils/$t';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { getQueryParams } from '@utils/api/getQueryParams';
import { HxRequestHeader, HxResponseHeader } from '@vars';

import { mealContext } from './context';
import { MealsSection } from '../components/MealsSection';

export const deleteMeal = new Elysia()
  .use(mealContext)
  .delete('/:id', async ({ mealDoc, user, set, request }) => {
    try {
      await mealDoc.deleteOne();

      await ShoppingList.updateMany(
        { 'meals.meal': mealDoc._id },
        { $pull: { meals: { meal: mealDoc._id } } },
      );
    } catch {
      throw new NotificationError('Mongo Error');
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader('success', $t('meals.deleteMeal.success'));

    const currentUrl = request.headers.get(HxRequestHeader.CurrentUrl);

    if (currentUrl && currentUrl.includes('/meals/')) {
      set.headers[HxResponseHeader.Location] = '/meals';

      return;
    }

    return <MealsSection user={user} query={getQueryParams(currentUrl)} />;
  });
