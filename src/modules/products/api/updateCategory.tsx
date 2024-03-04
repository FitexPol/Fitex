import { Elysia } from 'elysia';

import { context } from '@/context';
import { $t } from '@utils/$t';
import { getBodySchema } from '@utils/getBodySchema';
import { getNotificationHeader } from '@utils/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { type CategoryForm as CategoryFormType, categoryForm } from '../forms';
import { Category } from '../models/category';
import { getCategoryFormWithErrors } from '../utils/getCategoryFormWithErrors';

const _t = $t('products');
const _tShared = $t('_shared');

export const updateCategory = new Elysia().use(context).patch(
  ':id',
  async ({ params: { id }, body, set }) => {
    const categoryDoc = await Category.findById(id);

    if (!categoryDoc) {
      set.status = 'Not Found';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', _t('_shared.errors.notFound'));

      return;
    }

    try {
      await categoryDoc.updateOne({ name: { 'pl-PL': body['pl-PL'] } });
    } catch {
      set.status = 'Bad Request';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
        'error',
        _tShared('_shared.errors.badRequest'),
      );

      return;
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader('success', _t('updateCategory.success'));
    set.headers[HxResponseHeader.Location] = '/admin-panel/categories';
  },
  {
    body: getBodySchema<CategoryFormType>(categoryForm),
    error: async ({ code, error }) => {
      if (code === 'VALIDATION') {
        return getCategoryFormWithErrors(error);
      }
    },
  },
);
