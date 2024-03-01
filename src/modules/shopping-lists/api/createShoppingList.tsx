import { Elysia } from 'elysia';

import { context } from '@/context';
import { getGroupedMeals } from '@meals/utils/getGroupedMeals';
import { getMealsById } from '@meals/utils/getMealsById';
import { getGroupedProducts } from '@products/utils/getGroupedProducts';
import { getProductsById } from '@products/utils/getProductsById';
import { $t } from '@utils/$t';
import { getBodySchema } from '@utils/getBodySchema';
import { getNotificationHeader } from '@utils/getNotificationHeader';
import { getParsedBody } from '@utils/getParsedBody';
import { getPath } from '@utils/getPath';
import { HxResponseHeader, type Unit } from '@vars';

import { type ShoppingListForm as ShoppingListFormType, shoppingListForm } from '../forms';
import { ShoppingList } from '../models/shoppingList';
import { getShoppingListFormWithErrors } from '../utils/getShoppingListFormWithErrors';

const _t = $t('shoppingLists');
const _tShared = $t('_shared');

export type ShoppingListBody<T> = T & {
  meals: {
    mealId: string;
    quantity: number;
  }[];
  products: {
    productId: string;
    quantity: number;
    unit: Unit;
  }[];
};

export const createShoppingList = new Elysia().use(context).post(
  '',
  async ({ body, user, set }) => {
    const {
      meals: mealsBody,
      products: productsBody,
      ...shoppingListBody
    } = getParsedBody<ShoppingListBody<Omit<typeof body, 'meals' | 'products'>>>(body);

    const shoppingListMeals = await getMealsById(getGroupedMeals(mealsBody));
    const shoppingListProducts = await getProductsById(getGroupedProducts(productsBody));

    const shoppingListDoc = new ShoppingList({
      ...shoppingListBody,
      author: user!.id,
      meals: shoppingListMeals,
      products: shoppingListProducts,
    });

    try {
      await shoppingListDoc.save();
    } catch {
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
        'error',
        _tShared('_shared.errors.badRequest'),
      );

      return;
    }

    set.status = 'Created';
    set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
      'success',
      _t('createShoppingList.success'),
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
