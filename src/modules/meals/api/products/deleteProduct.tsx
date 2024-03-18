import { Elysia } from 'elysia';

import { context } from '@/context';
import { ProductsTable } from '@components/ProductsTable';
import { $t } from '@utils/$t';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { Meal } from '../../models/meal';

export const deleteProduct = new Elysia()
  .use(context)
  .delete(':productId', async ({ params: { id: mealId, productId }, set, user }) => {
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

    mealDoc.products = mealDoc.products.filter((productDoc) => !productDoc._id.equals(productId));

    try {
      await mealDoc.save();
    } catch {
      set.status = 'Bad Request';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', $t('_errors.badRequest'));

      return;
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
      'success',
      $t('products.deleteProduct.success'),
    );

    return <ProductsTable entity={mealDoc} basePath="meals" />;
  });
