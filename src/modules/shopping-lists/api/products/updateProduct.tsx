import { Elysia } from 'elysia';

import { context } from '@/context';
import { type UpdateProductForm, updateProductForm } from '@forms/updateProduct';
import { type Unit } from '@models/product';
import { $t } from '@utils/$t';
import { getBodySchema } from '@utils/api/getBodySchema';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { NotificationError } from '@utils/errors/NotificationError';
import { HxResponseHeader } from '@vars';

import { shoppingListContext } from '../context';

export const updateProduct = new Elysia()
  .use(context)
  .use(shoppingListContext)
  .patch(
    '',
    async ({ shoppingListDoc, params: { productId }, set, body }) => {
      const productDoc = shoppingListDoc.products.find((productDoc) => productDoc._id.equals(productId));

      if (!productDoc) throw new NotificationError({ status: 404, message: $t('_errors.notFound') });

      productDoc.name = body.name;
      productDoc.quantity = Number(body.quantity);
      productDoc.unit = body.unit as Unit;
      productDoc.isChecked = false;

      try {
        await shoppingListDoc.save();
      } catch {
        throw new NotificationError({ status: 500, message: $t('_errors.mongoError') });
      }

      set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
        'success',
        $t('products.updateProduct.success'),
      );
      set.headers[HxResponseHeader.Location] = `/shopping-lists/${shoppingListDoc.id}`;
    },
    {
      body: getBodySchema<UpdateProductForm>(updateProductForm),
    },
  );
