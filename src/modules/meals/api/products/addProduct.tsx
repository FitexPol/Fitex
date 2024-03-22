import { Elysia } from 'elysia';

import { ProductsTable } from '@components/ProductsTable';
import { NotificationError } from '@errors/NotificationError';
import { type AddProductForm, addProductForm } from '@forms/addProduct';
import { Product } from '@models/product';
import { $t } from '@utils/$t';
import { getBodySchema } from '@utils/api/getBodySchema';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { mealContext } from '../context';

export const addProduct = new Elysia().use(mealContext).post(
  '',
  async ({ mealDoc, set, body }) => {
    if (mealDoc.products.some((productDoc) => productDoc.name === body.name))
      throw new NotificationError({
        status: 400,
        message: $t('products.addProduct.errors.productAlreadyExists'),
      });

    const productDoc = new Product({ name: body.name });

    try {
      mealDoc.products.push(productDoc);
      await mealDoc.save();
    } catch {
      throw new NotificationError('Mongo Error');
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
      'success',
      $t('products.addProduct.success'),
    );

    return <ProductsTable entity={mealDoc} basePath="meals" />;
  },
  {
    body: getBodySchema<AddProductForm>(addProductForm),
  },
);
