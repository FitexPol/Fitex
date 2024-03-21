import { Elysia } from 'elysia';

import { context } from '@/context';
import { ProductsTable } from '@components/ProductsTable';
import { $t } from '@utils/$t';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { NotificationError } from '@utils/errors/NotificationError';
import { HxResponseHeader } from '@vars';

import { shoppingListContext } from '../context';

export const deleteProduct = new Elysia()
  .use(context)
  .use(shoppingListContext)
  .delete('', async ({ shoppingListDoc, params: { productId }, set }) => {
    shoppingListDoc.products = shoppingListDoc.products.filter(
      (productDoc) => !productDoc._id.equals(productId),
    );

    try {
      await shoppingListDoc.save();
    } catch {
      throw new NotificationError({ status: 500, message: $t('_errors.mongoError') });
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
      'success',
      $t('products.deleteProduct.success'),
    );

    return <ProductsTable entity={shoppingListDoc} basePath="shopping-lists" />;
  });
