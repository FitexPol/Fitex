import { Elysia } from 'elysia';

import { context } from '@/context';
import { Meal } from '@meals/models/meal';
import { Product } from '@models/product';
import { $t } from '@utils/$t';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';
import { HxResponseHeader } from '@vars';

import { ShoppingList } from '../../models/shoppingList';

export const addProducts = new Elysia().use(context).put('', async ({ params: { id }, set, user, query }) => {
  const shoppingListDoc = await ShoppingList.findById(id).exec();

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

  const mealId = getQueryParamSecure(query.mealId);

  if (!mealId) {
    set.status = 'Bad Request';
    set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', $t('_errors.badRequest'));

    return;
  }

  const mealDoc = await Meal.findById(mealId).exec();

  if (!mealDoc) {
    set.status = 'Not Found';
    set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', $t('_errors.notFound'));

    return;
  }

  if (!mealDoc.author._id.equals(user!.id)) {
    set.status = 'Forbidden';
    set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', $t('_errors.permissionDenied'));

    return;
  }

  mealDoc.products.forEach(({ name, quantity, unit }) => {
    const existingProductDoc = shoppingListDoc.products.find((productDoc) => productDoc.name === name);

    if (!existingProductDoc || (existingProductDoc && existingProductDoc.unit !== unit)) {
      const newProductDoc = new Product({ name, quantity, unit });
      shoppingListDoc.products.push(newProductDoc);
      return;
    }

    existingProductDoc.quantity += quantity;
  });

  try {
    await shoppingListDoc.save();
  } catch {
    set.status = 'Bad Request';
    set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', $t('_errors.badRequest'));

    return;
  }

  set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
    'success',
    $t('products.addProducts.success'),
  );
  set.headers[HxResponseHeader.Location] = `/shopping-lists/${shoppingListDoc.id}`;
});
