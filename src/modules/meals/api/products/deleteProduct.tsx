import { Elysia } from 'elysia';

import { context } from '@/context';
import { ProductsTable } from '@components/ProductsTable';
import { $t } from '@utils/$t';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { NotificationError } from '@utils/errors/NotificationError';
import { HxResponseHeader } from '@vars';

import { mealContext } from '../context';

export const deleteProduct = new Elysia()
  .use(context)
  .use(mealContext)
  .delete(':productId', async ({ mealDoc, params: { productId }, set }) => {
    mealDoc.products = mealDoc.products.filter((productDoc) => !productDoc._id.equals(productId));

    try {
      await mealDoc.save();
    } catch {
      throw new NotificationError({ status: 500, message: $t('_errors.mongoError') });
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
      'success',
      $t('products.deleteProduct.success'),
    );

    return <ProductsTable entity={mealDoc} basePath="meals" />;
  });
