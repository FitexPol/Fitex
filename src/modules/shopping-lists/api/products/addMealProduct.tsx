import { Elysia } from 'elysia';

import { NotificationError } from '@errors/NotificationError';
import { type UpdateProductForm, updateProductForm } from '@forms/updateProduct';
import { Product } from '@models/product';
import { $t } from '@utils/$t';
import { getBodySchema } from '@utils/api/getBodySchema';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { shoppingListContext } from '../context';

export const addMealProduct = new Elysia().use(shoppingListContext).put(
  '',
  async ({ shoppingListDoc, body, set }) => {
    const existingProductDoc = shoppingListDoc.products.find(
      (productDoc) => productDoc.name === body.name && productDoc.unit === body.unit,
    );

    if (existingProductDoc) {
      existingProductDoc.quantity += Number(body.quantity);
    } else {
      const product = new Product({
        name: body.name,
        quantity: Number(body.quantity),
        unit: body.unit,
        isChecked: false,
      });

      shoppingListDoc.products.push(product);
    }

    try {
      await shoppingListDoc.save();
    } catch {
      throw new NotificationError('Mongo Error');
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
      'success',
      existingProductDoc ? $t('products.updateProduct.success') : $t('products.addProduct.success'),
    );
  },
  {
    body: getBodySchema<UpdateProductForm>(updateProductForm),
  },
);
