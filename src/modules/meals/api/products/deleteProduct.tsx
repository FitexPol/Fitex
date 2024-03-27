import { Elysia } from 'elysia';

import { ProductsTable } from '@components/ProductsTable';
import { NotificationError } from '@errors/NotificationError';
import { $t } from '@utils/$t';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { mealContext } from '../context';

export const deleteProduct = new Elysia()
  .use(mealContext)
  .delete('', async ({ mealDoc, params: { productId }, set }) => {
    mealDoc.products = mealDoc.products.filter((productDoc) => !productDoc._id.equals(productId));

    try {
      await mealDoc.save();
    } catch {
      throw new NotificationError('Mongo Error');
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
      'success',
      $t('products.deleteProduct.success'),
    );

    return <ProductsTable entity={mealDoc} basePath="meals" />;
  });
