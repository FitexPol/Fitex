import { Elysia } from 'elysia';

import { context } from '@/context';
import { ProductsTable } from '@components/ProductsTable';
import { $t } from '@utils/$t';
import { getNotificationHeader } from '@utils/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { ShoppingList } from '../../models/shoppingList';

const _t = $t('shoppingLists');
const _tShared = $t('_shared');

export const deleteProduct = new Elysia()
  .use(context)
  .delete(':productId', async ({ params: { id: shoppingListId, productId }, set, user }) => {
    const shoppingListDoc = await ShoppingList.findById(shoppingListId).exec();

    if (!shoppingListDoc) {
      set.status = 'Not Found';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', _t('_shared.errors.notFound'));

      return;
    }

    if (!shoppingListDoc.author._id.equals(user!.id)) {
      set.status = 'Forbidden';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
        'error',
        _t('_shared.errors.permissionDenied'),
      );

      return;
    }

    shoppingListDoc.products = shoppingListDoc.products.filter(
      (productDoc) => !productDoc._id.equals(productId),
    );

    try {
      await shoppingListDoc.save();
    } catch {
      set.status = 'Bad Request';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
        'error',
        _tShared('_shared.errors.badRequest'),
      );

      return;
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
      'success',
      _tShared('_shared.deleteProduct.success'),
    );

    return <ProductsTable entity={shoppingListDoc} basePath="shopping-lists" />;
  });
