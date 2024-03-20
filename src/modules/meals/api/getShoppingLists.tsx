import { Elysia } from 'elysia';

import { context } from '@/context';
import { $t } from '@utils/$t';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { getPath } from '@utils/getPath';
import { HxResponseHeader } from '@vars';

import { Meal } from '../models/meal';

export const getShoppingLists = new Elysia()
  .use(context)
  .get('/shopping-lists', async ({ params: { id }, set, user, query }) => {
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

    const productIds = Object.keys(query).reduce(
      (acc, productId, i) => {
        const product = mealDoc.products.find((product) => product._id.equals(productId));

        return product ? { ...acc, [`product-${i}`]: product.id } : acc;
      },
      {} as Record<string, string>,
    );

    set.headers[HxResponseHeader.Location] = getPath(`/meals/${mealDoc.id}/shopping-lists`, productIds);
  });
