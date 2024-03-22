import { Elysia } from 'elysia';

import { NotificationError } from '@errors/NotificationError';
import { type UpdateProductForm, updateProductForm } from '@forms/updateProduct';
import { type Unit } from '@models/product';
import { $t } from '@utils/$t';
import { getBodySchema } from '@utils/api/getBodySchema';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { mealContext } from '../context';

export const updateProduct = new Elysia().use(mealContext).patch(
  ':productId',
  async ({ mealDoc, params: { productId }, set, body }) => {
    const productDoc = mealDoc.products.find((productDoc) => productDoc._id.equals(productId));

    if (!productDoc) throw new NotificationError('Not Found');

    productDoc.name = body.name;
    productDoc.quantity = Number(body.quantity);
    productDoc.unit = body.unit as Unit;

    try {
      await mealDoc.save();
    } catch {
      throw new NotificationError('Mongo Error');
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
      'success',
      $t('products.updateProduct.success'),
    );
    set.headers[HxResponseHeader.Location] = `/meals/${mealDoc.id}`;
  },
  {
    body: getBodySchema<UpdateProductForm>(updateProductForm),
  },
);
