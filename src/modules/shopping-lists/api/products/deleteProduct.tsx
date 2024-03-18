import { Elysia } from 'elysia';

import { context } from '@/context';
import { ProductsTable } from '@components/ProductsTable';
import { $t } from '@utils/$t';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { ShoppingList } from '../../models/shoppingList';

export const deleteProduct = new Elysia()
  .use(context)
  .delete(':productId', async ({ params: { id: shoppingListId, productId }, set, user }) => {
    const shoppingListDoc = await ShoppingList.findById(shoppingListId).exec();

    if (!shoppingListDoc) {
      set.status = 'Not Found';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', $t('_errors.notFound'));

      return;
    }

    if (!shoppingListDoc.author._id.equals(user!.id)) {
      set.status = 'Forbidden';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', $t('_errors.permissionDenied'));

      return;
    }

    shoppingListDoc.products = shoppingListDoc.products.filter(
      (productDoc) => !productDoc._id.equals(productId),
    );

    try {
      await shoppingListDoc.save();
    } catch {
      set.status = 'Bad Request';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', $t('_errors.badRequest'));

      return;
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
      'success',
      $t('products.deleteProduct.success'),
    );

    return <ProductsTable entity={shoppingListDoc} basePath="shopping-lists" />;
  });
