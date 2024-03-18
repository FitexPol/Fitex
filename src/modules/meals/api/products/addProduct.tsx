import { Elysia } from 'elysia';

import { context } from '@/context';
import { ProductsTable } from '@components/ProductsTable';
import { type AddProductForm, addProductForm } from '@forms/addProduct';
import { Product } from '@models/product';
import { $t } from '@utils/$t';
import { getBodySchema } from '@utils/api/getBodySchema';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { Meal } from '../../models/meal';

export const addProduct = new Elysia().use(context).post(
  '',
  async ({ params: { id }, set, user, body }) => {
    const mealDoc = await Meal.findById(id).exec();

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

    if (mealDoc.products.some((productDoc) => productDoc.name === body.name)) {
      set.status = 'Bad Request';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
        'error',
        $t('products.addProduct.errors.productAlreadyExists'),
      );

      return;
    }

    const productDoc = new Product({ name: body.name });

    try {
      mealDoc.products.push(productDoc);
      await mealDoc.save();
    } catch {
      set.status = 'Bad Request';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', $t('_errors.badRequest'));

      return;
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
