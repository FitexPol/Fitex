import { Elysia } from 'elysia';

import { context } from '@/context';
import { type UpdateProductForm, updateProductForm } from '@products/forms/update-product';
import { type Unit } from '@products/models/product';
import { $t } from '@utils/$t';
import { getBodySchema } from '@utils/getBodySchema';
import { getNotificationHeader } from '@utils/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { Meal } from '../../models/meal';

const _t = $t('meals');
const _tShared = $t('_shared');

export const updateProduct = new Elysia().use(context).patch(
  ':productId',
  async ({ params: { id: mealId, productId }, set, user, body }) => {
    const mealDoc = await Meal.findById(mealId).exec();

    if (!mealDoc) {
      set.status = 'Not Found';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', _t('_shared.errors.notFound'));

      return;
    }

    if (!mealDoc.author._id.equals(user!.id)) {
      set.status = 'Forbidden';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
        'error',
        _t('_shared.errors.permissionDenied'),
      );

      return;
    }

    const productDoc = mealDoc.products.find((productDoc) => productDoc._id.equals(productId));

    if (!productDoc) {
      set.status = 'Not Found';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', _t('_shared.errors.notFound'));

      return;
    }

    productDoc.name = body.name;
    productDoc.quantity = Number(body.quantity);
    productDoc.unit = body.unit as Unit;

    try {
      await mealDoc.save();
    } catch {
      set.status = 'Bad Request';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
        'error',
        _tShared('_shared.errors.badRequest'),
      );

      return;
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader('success', _tShared('_shared.updateProduct.success'));
    set.headers[HxResponseHeader.Location] = `/meals/${mealDoc.id}/edit`;
  },
  {
    body: getBodySchema<UpdateProductForm>(updateProductForm),
  },
);
