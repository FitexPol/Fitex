import { Elysia } from 'elysia';

import { context } from '@/context';
import { ProductsTable } from '@products/components/ProductsTable';
import { $t } from '@utils/$t';
import { getNotificationHeader } from '@utils/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { Meal } from '../../models/meal';

const _t = $t('meals');
const _tShared = $t('_shared');

export const deleteProduct = new Elysia()
  .use(context)
  .delete(':productId', async ({ params: { id: mealId, productId }, set, user }) => {
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

    mealDoc.products = mealDoc.products.filter((productDoc) => !productDoc._id.equals(productId));

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

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader('success', _tShared('_shared.deleteProduct.success'));

    return (
      <ProductsTable
        products={mealDoc.products}
        actionPaths={{
          edit: `/meals/${mealId}/product-form`,
          delete: `/api/meals/${mealId}/products`,
        }}
      />
    );
  });
