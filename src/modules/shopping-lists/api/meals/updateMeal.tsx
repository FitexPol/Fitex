import { Elysia } from 'elysia';

import { context } from '@/context';
import { $t } from '@utils/$t';
import { getBodySchema } from '@utils/api/getBodySchema';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { type UpdateMealForm, updateMealForm } from '../../forms/updateMeal';
import { ShoppingList } from '../../models/shoppingList';

export const updateMeal = new Elysia().use(context).patch(
  ':mealId',
  async ({ params: { id: shoppingListId, mealId }, set, user, body }) => {
    const shoppingListDoc = await ShoppingList.findById(shoppingListId).populate('meals.meal').exec();

    if (!shoppingListDoc) {
      set.status = 'Not Found';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', $t('_errors.notFound'));

      return;
    }

    if (!shoppingListDoc.author._id.equals(user!.id)) {
      set.status = 'Forbidden';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', $t('_errors.permissionDenied'));

      return;
    }

    const mealDoc = shoppingListDoc.meals.find(({ meal }) => {
      if (!meal) return false;
      return meal._id.equals(mealId);
    });

    if (!mealDoc) {
      set.status = 'Not Found';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', $t('_errors.notFound'));

      return;
    }

    mealDoc.quantity = Number(body.quantity);

    try {
      await shoppingListDoc.save();
    } catch {
      set.status = 'Bad Request';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', $t('_errors.badRequest'));

      return;
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
      'success',
      $t('shoppingLists.updateMeal.success'),
    );
    set.headers[HxResponseHeader.Location] = `/shopping-lists/${shoppingListDoc.id}/edit`;
  },
  {
    body: getBodySchema<UpdateMealForm>(updateMealForm),
  },
);
