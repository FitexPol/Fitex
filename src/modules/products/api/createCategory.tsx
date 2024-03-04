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

export const createCategory = new Elysia().use(context).post(
  '',
  async ({ body, set }) => {
    const categoryDoc = new Category({
      name: {
        'pl-PL': body['pl-PL'],
      },
    });

    try {
      await categoryDoc.save();
    } catch {
      set.status = 'Bad Request';

      set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
        'error',
        _tShared('_shared.errors.badRequest'),
      );

      return;
    }

    set.status = 'Created';
    set.headers[HxResponseHeader.Location] = `/admin-panel/categories`;
    set.headers[HxResponseHeader.Trigger] = getNotificationHeader('success', _t('createCategory.success'));
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
