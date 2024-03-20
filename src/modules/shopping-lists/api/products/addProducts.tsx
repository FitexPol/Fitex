import { Elysia } from 'elysia';

import { context } from '@/context';
import { Meal } from '@meals/models/meal';
import { Product, type ProductDoc } from '@models/product';
import { $t } from '@utils/$t';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { ShoppingList } from '../../models/shoppingList';

export const addProducts = new Elysia().use(context).put('', async ({ params: { id }, set, user, body }) => {
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

  const mealId = (body as Record<string, string>).mealId;

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

  const productDocs = Object.entries(body as Record<string, string>).reduce((acc, [key, value]) => {
    if (!key.startsWith('product-') || !value) return acc;

    const productDoc = mealDoc.products.find((productDoc) => productDoc._id.equals(value));

    if (!productDoc) return acc;

    return [...acc, productDoc];
  }, [] as ProductDoc[]);

  const iterable = productDocs.length ? productDocs : mealDoc.products;

  iterable.forEach(({ name, quantity, unit }) => {
    const existingProductDoc = shoppingListDoc.products.find((productDoc) => productDoc.name === name);

    if (!existingProductDoc || (existingProductDoc && existingProductDoc.unit !== unit)) {
      const newProductDoc = new Product({ name, quantity, unit });
      shoppingListDoc.products.push(newProductDoc);
      return;
    }

    existingProductDoc.quantity += quantity;
    existingProductDoc.isChecked = false;
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
