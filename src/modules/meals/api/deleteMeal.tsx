import { Elysia } from 'elysia';

import { NotificationError } from '@errors/NotificationError';
import { ShoppingList } from '@shopping-lists/models/shoppingList';
import { $t } from '@utils/$t';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { mealContext } from './context';

export const deleteMeal = new Elysia().use(mealContext).delete('', async ({ mealDoc, set }) => {
  try {
    await mealDoc.deleteOne();

    await ShoppingList.updateMany({ 'meals.meal': mealDoc._id }, { $pull: { meals: { meal: mealDoc._id } } });
  } catch {
    throw new NotificationError('Mongo Error');
  }

  set.headers[HxResponseHeader.Trigger] = getNotificationHeader('success', $t('meals.deleteMeal.success'));
  set.headers[HxResponseHeader.Location] = '/meals';
});
