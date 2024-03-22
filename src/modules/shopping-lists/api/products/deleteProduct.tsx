import { Elysia } from 'elysia';

import { ProductsTable } from '@components/ProductsTable';
import { NotificationError } from '@errors/NotificationError';
import { $t } from '@utils/$t';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { shoppingListContext } from '../context';

export const deleteProduct = new Elysia()
  .use(shoppingListContext)
  .delete('', async ({ shoppingListDoc, params: { productId }, set }) => {
    shoppingListDoc.products = shoppingListDoc.products.filter(
      (productDoc) => !productDoc._id.equals(productId),
    );

    try {
      await shoppingListDoc.save();
    } catch {
      throw new NotificationError('Mongo Error');
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
      'success',
      $t('products.deleteProduct.success'),
    );

    return <ProductsTable entity={shoppingListDoc} basePath="shopping-lists" />;
  });
