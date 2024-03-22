import { Elysia } from 'elysia';

import { NotificationError } from '@errors/NotificationError';
import { Meal } from '@meals/models/meal';
import { Product, type ProductDoc } from '@models/product';
import { $t } from '@utils/$t';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { shoppingListContext } from '../context';

export const addProducts = new Elysia()
  .use(shoppingListContext)
  .put('', async ({ shoppingListDoc, set, user, body }) => {
    const mealId = (body as Record<string, string>).mealId;

    if (!mealId) throw new NotificationError('Bad Request');

    const mealDoc = await Meal.findById(mealId).exec();

    if (!mealDoc) throw new NotificationError('Not Found');

    if (!mealDoc.author._id.equals(user.id)) throw new NotificationError('Permission Denied');

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
      throw new NotificationError('Mongo Error');
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
      'success',
      $t('products.addProducts.success'),
    );
    set.headers[HxResponseHeader.Location] = `/shopping-lists/${shoppingListDoc.id}`;
  });
