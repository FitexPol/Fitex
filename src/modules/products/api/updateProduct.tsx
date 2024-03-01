import { Elysia } from 'elysia';

import { context } from '@/context';
import { $t } from '@utils/$t';
import { getBodySchema } from '@utils/getBodySchema';
import { getNotificationHeader } from '@utils/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { type ProductForm as ProductFormType, productForm } from '../forms';
import { Product } from '../models/product';
import { getProductFormWithErrors } from '../utils/getProductFormWithErrors';

const _t = $t('products');
const _tShared = $t('_shared');

export const updateProduct = new Elysia().use(context).patch(
  ':id',
  async ({ params: { id }, body, set }) => {
    const productDoc = await Product.findById(id);

    if (!productDoc) {
      set.status = 'Not Found';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', _t('_shared.errors.notFound'));

      return;
    }

    const { category, ...name } = body;

    try {
      await productDoc.updateOne({ name, category });
    } catch {
      set.status = 'Bad Request';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
        'error',
        _tShared('_shared.errors.badRequest'),
      );

      return;
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader('success', _t('updateProduct.success'));
    set.headers[HxResponseHeader.Location] = '/admin-panel/products';
  },
  {
    body: getBodySchema<ProductFormType>(productForm),
    error: async ({ code, error }) => {
      if (code === 'VALIDATION') {
        return getProductFormWithErrors(error);
      }
    },
  },
);
