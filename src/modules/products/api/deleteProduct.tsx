import { Elysia } from 'elysia';

import { context } from '@/context';
import { Meal } from '@meals/models/meal';
import { ShoppingList } from '@shopping-lists/models/shoppingList';
import { $t } from '@utils/$t';
import { getNotificationHeader } from '@utils/getNotificationHeader';
import { getQueryParams } from '@utils/getQueryParams';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';
import { HxRequestHeader, HxResponseHeader } from '@vars';

import { Products } from '../components/Products';
import { Product } from '../models/product';

const _t = $t('products');
const _tShared = $t('_shared');

export const deleteProduct = new Elysia()
  .use(context)
  .delete(':id', async ({ set, params: { id }, request }) => {
    const productDoc = await Product.findById(id).exec();

    if (!productDoc) {
      set.status = 'Not Found';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', _t('_shared.errors.notFound'));

      return;
    }

    try {
      await productDoc.deleteOne();

      await Meal.updateMany(
        { 'products.product': productDoc._id },
        { $pull: { products: { product: productDoc._id } } },
      );

      await ShoppingList.updateMany(
        { 'products.product': productDoc._id },
        { $pull: { products: { product: productDoc._id } } },
      );
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

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader('success', _t('deleteProduct.success'));

    return (
      <Products
        plNameQuery={getQueryParamSecure(queryParams['name.pl-PL'])}
        categoryQuery={getQueryParamSecure(queryParams.category)}
        sortQuery={getQueryParamSecure(queryParams.sort)}
        itemsPerPageQuery={getQueryParamSecure(queryParams.itemsPerPage)}
        pageQuery={getQueryParamSecure(queryParams.page)}
      />
    );
  });
