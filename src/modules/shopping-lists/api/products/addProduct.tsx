import { Elysia } from 'elysia';

import { context } from '@/context';
import { ProductsTable } from '@components/ProductsTable';
import { type AddProductForm, addProductForm } from '@forms/add-product';
import { Product } from '@models/product';
import { $t } from '@utils/$t';
import { getBodySchema } from '@utils/getBodySchema';
import { getNotificationHeader } from '@utils/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { ShoppingList } from '../../models/shoppingList';

const _t = $t('shoppingLists');
const _tShared = $t('_shared');

export const addProduct = new Elysia().use(context).post(
  '',
  async ({ params: { id }, set, user, body }) => {
    const shoppingListDoc = await ShoppingList.findById(id).exec();

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

    if (shoppingListDoc.products.some((productDoc) => productDoc.name === body.name)) {
      set.status = 'Bad Request';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
        'error',
        _tShared('_shared.addProduct.errors.productAlreadyExists'),
      );

      return;
    }

    const productDoc = new Product({ name: body.name });
    shoppingListDoc.products.push(productDoc);

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
      _tShared('_shared.addProduct.success'),
    );

    return <ProductsTable entity={shoppingListDoc} basePath="shopping-lists" />;
  },
  {
    body: getBodySchema<AddProductForm>(addProductForm),
  },
);
