import { Elysia } from 'elysia';

import { context } from '@/context';
import { $t } from '@utils/$t';
import { getNotificationHeader } from '@utils/getNotificationHeader';
import { getQueryParams } from '@utils/getQueryParams';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';
import { HxRequestHeader, HxResponseHeader } from '@vars';

import { Categories } from '../components/Categories';
import { Category } from '../models/category';
import { Product } from '../models/product';

const _t = $t('products');
const _tShared = $t('_shared');

export const deleteCategory = new Elysia()
  .use(context)
  .delete(':id', async ({ set, params: { id }, request }) => {
    const categoryDoc = await Category.findById(id).exec();

    if (!categoryDoc) {
      set.status = 'Not Found';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
        'error',
        _t('_shared.categories.errors.notFound'),
      );

      return;
    }

    try {
      await categoryDoc.deleteOne();

      await Product.updateMany({ category: categoryDoc._id }, { category: null });
    } catch {
      set.status = 'Bad Request';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
        'error',
        _tShared('_shared.errors.badRequest'),
      );

      return;
    }

    const currentUrl = request.headers.get(HxRequestHeader.CurrentUrl);
    const queryParams = getQueryParams(currentUrl);

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader('success', _t('deleteCategory.success'));

    return (
      <Categories
        plNameQuery={getQueryParamSecure(queryParams['name.pl-PL'])}
        sortQuery={getQueryParamSecure(queryParams.sort)}
        itemsPerPageQuery={getQueryParamSecure(queryParams.itemsPerPage)}
        pageQuery={getQueryParamSecure(queryParams.page)}
      />
    );
  });
