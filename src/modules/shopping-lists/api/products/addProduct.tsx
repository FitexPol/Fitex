import { Elysia } from 'elysia';

import { MostUsedProducts } from '@components/MostUsedProducts';
import { addProductDTO } from '@dto/addProduct';
import { NotificationError } from '@errors/NotificationError';
import { Product } from '@models/product';
import { $t } from '@utils/$t';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { getMostUsedProductNames } from '@utils/getMostUsedProductNames';
import { HxResponseHeader } from '@vars';

import { shoppingListContext } from '../context';

export const addProduct = new Elysia().use(shoppingListContext).post(
  '',
  async ({ shoppingListDoc, set, body, user }) => {
    if (shoppingListDoc.products.some((productDoc) => productDoc.name === body.name))
      throw new NotificationError({
        status: 400,
        message: $t('products.addProduct.errors.productAlreadyExists'),
      });

    const productDoc = new Product({ name: body.name });
    shoppingListDoc.products.push(productDoc);

    try {
      await shoppingListDoc.save();
    } catch {
      throw new NotificationError('Mongo Error');
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
      'success',
      $t('products.addProduct.success'),
    );

    const productNames = await getMostUsedProductNames(user);

    return (
      <MostUsedProducts basePath="shopping-lists" entity={shoppingListDoc} productNames={productNames} />
    );
  },
  {
    body: addProductDTO,
  },
);
