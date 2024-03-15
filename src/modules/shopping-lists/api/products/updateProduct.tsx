import { Elysia } from 'elysia';

import { context } from '@/context';
import { type UpdateProductForm, updateProductForm } from '@forms/updateProduct';
import { type Unit } from '@models/product';
import { $t } from '@utils/$t';
import { getBodySchema } from '@utils/api/getBodySchema';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { ShoppingList } from '../../models/shoppingList';

export const updateProduct = new Elysia().use(context).patch(
  ':productId',
  async ({ params: { id: shoppingListId, productId }, set, user, body }) => {
    const shoppingListDoc = await ShoppingList.findById(shoppingListId).exec();

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

    const productDoc = shoppingListDoc.products.find((productDoc) => productDoc._id.equals(productId));

    if (!productDoc) {
      set.status = 'Not Found';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', $t('errors.notFound'));

      return;
    }

    productDoc.name = body.name;
    productDoc.quantity = Number(body.quantity);
    productDoc.unit = body.unit as Unit;

    try {
      await shoppingListDoc.save();
    } catch {
      set.status = 'Bad Request';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', $t('errors.badRequest'));

      return;
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader('success', $t('updateProduct.success'));
    set.headers[HxResponseHeader.Location] = `/shopping-lists/${shoppingListDoc.id}/edit`;
  },
  {
    body: getBodySchema<UpdateProductForm>(updateProductForm),
  },
);
