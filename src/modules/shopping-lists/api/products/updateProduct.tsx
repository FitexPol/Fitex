import { Elysia } from 'elysia';

import { updateProductDTO } from '@dto/updateProduct';
import { NotificationError } from '@errors/NotificationError';
import { type Unit } from '@models/product';
import { $t } from '@utils/$t';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { shoppingListContext } from '../context';

export const updateProduct = new Elysia().use(shoppingListContext).patch(
  '',
  async ({ shoppingListDoc, params: { productId }, set, body }) => {
    const productDoc = shoppingListDoc.products.find((productDoc) => productDoc._id.equals(productId));

    if (!productDoc) throw new NotificationError('Not Found');

    productDoc.name = body.name;
    productDoc.quantity = Number(body.quantity);
    productDoc.unit = body.unit as Unit;
    productDoc.isChecked = false;

    try {
      await shoppingListDoc.save();
    } catch {
      throw new NotificationError('Mongo Error');
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
      'success',
      $t('products.updateProduct.success'),
    );
    set.headers[HxResponseHeader.Location] = `/shopping-lists/${shoppingListDoc.id}`;
  },
  {
    body: updateProductDTO,
  },
);
