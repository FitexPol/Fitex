import { Elysia } from 'elysia';

import { context } from '@/context';
import { Meal } from '@meals/models/meal';
import { $t } from '@utils/$t';
import { getBodySchema } from '@utils/api/getBodySchema';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { MealsTable } from '../../components/MealsTable';
import { type AddMealForm, addMealForm } from '../../forms/addMeal';
import { ShoppingList } from '../../models/shoppingList';

export const addMeal = new Elysia().use(context).post(
  '',
  async ({ params: { id }, set, user, body }) => {
    if (!body.mealId) {
      set.status = 'Bad Request';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', $t('addMeal.errors.noMealId'));

      return;
    }

    const shoppingListDoc = await ShoppingList.findById(id).populate('meals.meal').exec();

    if (!shoppingListDoc) {
      set.status = 'Not Found';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', $t('errors.notFound'));

      return;
    }

    if (!shoppingListDoc.author._id.equals(user!.id)) {
      set.status = 'Forbidden';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', $t('errors.permissionDenied'));

      return;
    }

    if (shoppingListDoc.meals.some(({ meal }) => meal!._id.equals(body.mealId))) {
      set.status = 'Bad Request';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
        'error',
        $t('addMeal.errors.mealAlreadyExists'),
      );

      return;
    }

    const mealDoc = await Meal.findById(body.mealId).exec();
    shoppingListDoc.meals.push({ meal: mealDoc!, quantity: 1 });

    try {
      await shoppingListDoc.save();
    } catch {
      set.status = 'Bad Request';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', $t('errors.badRequest'));

      return;
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader('success', $t('addMeal.success'));

    return <MealsTable shoppingListDoc={shoppingListDoc} />;
  },
  {
    body: getBodySchema<AddMealForm>(addMealForm),
  },
);
