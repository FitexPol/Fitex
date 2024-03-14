import { Elysia } from 'elysia';

import { context } from '@/context';
import { ProductsTable } from '@products/components/ProductsTable';
import { type AddProductForm, addProductForm } from '@products/forms/add-product';
import { Product } from '@products/models/product';
import { $t } from '@utils/$t';
import { getBodySchema } from '@utils/getBodySchema';
import { getNotificationHeader } from '@utils/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { Meal } from '../../models/meal';

const _t = $t('meals');
const _tShared = $t('_shared');

export const addProduct = new Elysia().use(context).post(
  '',
  async ({ params: { id }, set, user, body }) => {
    const mealDoc = await Meal.findById(id).exec();

    if (!mealDoc) {
      set.status = 'Not Found';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', _t('_shared.errors.notFound'));

      return;
    }

    if (!mealDoc.author._id.equals(user!.id)) {
      set.status = 'Forbidden';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
        'error',
        _t('_shared.errors.permissionDenied'),
      );

      return;
    }

    if (mealDoc.products.some((productDoc) => productDoc.name === body.name)) {
      set.status = 'Bad Request';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
        'error',
        _tShared('_shared.addProduct.errors.productAlreadyExists'),
      );

      return;
    }

    const productDoc = new Product({ name: body.name });

    try {
      mealDoc.products.push(productDoc);
      await mealDoc.save();
    } catch {
      set.status = 'Bad Request';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
        'error',
        _tShared('_shared.errors.badRequest'),
      );

      return;
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader('success', _tShared('_shared.addProduct.success'));

    return (
      <ProductsTable
        products={mealDoc.products}
        actionPaths={{
          edit: `/meals/${id}/product-form`,
          delete: `/api/meals/${id}/products`,
        }}
      />
    );
  },
  {
    body: getBodySchema<AddProductForm>(addProductForm),
  },
);
