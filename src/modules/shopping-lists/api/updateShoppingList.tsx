import { Elysia } from 'elysia';

import { context } from '@/context';
import { getGroupedMeals } from '@meals/utils/getGroupedMeals';
import { getMealsById } from '@meals/utils/getMealsById';
import { $t } from '@utils/$t';
import { getBodySchema } from '@utils/getBodySchema';
import { getGroupedProducts } from '@utils/getGroupedProducts';
import { getNotificationHeader } from '@utils/getNotificationHeader';
import { getParsedBody } from '@utils/getParsedBody';
import { getPath } from '@utils/getPath';
import { HxResponseHeader } from '@vars';

import { type ShoppingListBody } from './createShoppingList';
import { type ShoppingListForm as ShoppingListFormType, shoppingListForm } from '../forms';
import { ShoppingList } from '../models/shoppingList';
import { getShoppingListFormWithErrors } from '../utils/getShoppingListFormWithErrors';

const _t = $t('shoppingLists');
const _tShared = $t('_shared');

export const updateShoppingList = new Elysia().use(context).patch(
  '/:id',
  async ({ body, user, set, params: { id } }) => {
    const {
      meals: mealsBody,
      products: productsBody,
      ...shoppingListBody
    } = getParsedBody<ShoppingListBody<Omit<typeof body, 'meals' | 'products'>>>(body);
    const shoppingListDoc = await ShoppingList.findById(id).exec();

    if (!shoppingListDoc) {
      set.status = 'Not Found';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', _t('_shared.errors.notFound'));

      return;
    }

    if (!shoppingListDoc.author._id.equals(user!.id)) {
      set.status = 'Forbidden';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
        'error',
        _t('_shared.errors.permissionDenied'),
      );

      return;
    }

    const shoppingListMeals = await getMealsById(getGroupedMeals(mealsBody));

    try {
      await shoppingListDoc.updateOne({
        ...shoppingListBody,
        meals: shoppingListMeals,
        products: getGroupedProducts(productsBody),
      });
    } catch {
      set.status = 'Bad Request';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
        'error',
        _tShared('_shared.errors.badRequest'),
      );

      return;
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
      'success',
      _t('updateShoppingList.success'),
    );

    set.headers[HxResponseHeader.Location] = getPath(`/shopping-lists/${shoppingListDoc.id}`, {
      groupByMeals: 'on',
    });
  },
  {
    body: getBodySchema<ShoppingListFormType>(shoppingListForm),
    error({ code, error, user }) {
      if (code === 'VALIDATION') {
        return getShoppingListFormWithErrors(error, user!);
      }
    },
  },
);
