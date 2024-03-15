import { Elysia } from 'elysia';

import { context } from '@/context';
import { $t } from '@utils/$t';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { MealsTable } from '../../components/MealsTable';
import { ShoppingList } from '../../models/shoppingList';

const _t = $t('shoppingLists');
const _tShared = $t('_shared');

export const deleteMeal = new Elysia()
  .use(context)
  .delete(':mealId', async ({ params: { id: shoppingListId, mealId }, set, user }) => {
    const shoppingListDoc = await ShoppingList.findById(shoppingListId).populate('meals.meal').exec();

    if (!shoppingListDoc) {
      set.status = 'Not Found';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', _t('_shared.errors.notFound'));

      return;
    }

    if (!shoppingListDoc.author._id.equals(user!.id)) {
      set.status = 'Forbidden';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
        'error',
        _t('_shared.errors.permissionDenied'),
      );

      return;
    }

    shoppingListDoc.meals = shoppingListDoc.meals.filter(({ meal }) => !meal!._id.equals(mealId));

    try {
      await shoppingListDoc.save();
    } catch {
      set.status = 'Bad Request';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
        'error',
        _tShared('_shared.errors.badRequest'),
      );

      return;
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
      'success',
      _tShared('_shared.deleteProduct.success'),
    );

    return <MealsTable shoppingListDoc={shoppingListDoc} />;
  });
