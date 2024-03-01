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

export const createProduct = new Elysia().use(context).post(
  '',
  async ({ body, set }) => {
    const { category, ...name } = body;

    const productDoc = new Product({
      name,
      category,
    });

    try {
      await productDoc.save();
    } catch {
      set.status = 'Bad Request';

      set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
        'error',
        _tShared('_shared.errors.badRequest'),
      );

      return;
    }

    set.status = 'Created';
    set.headers[HxResponseHeader.Location] = `/admin-panel/products`;
    set.headers[HxResponseHeader.Trigger] = getNotificationHeader('success', _t('createProduct.success'));
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
