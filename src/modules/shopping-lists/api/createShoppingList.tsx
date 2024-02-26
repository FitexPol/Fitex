import { Elysia } from 'elysia';

import { context } from '@/context';
import { type MealDoc } from '@meals/models/meal';
import { getMealsById } from '@meals/utils/getMealsById';
import { getBodySchema } from '@utils/getBodySchema';
import { getParsedBody } from '@utils/getParsedBody';
import { getPath } from '@utils/getPath';
import { HxResponseHeader, type Unit } from '@vars';

import { type ShoppingListForm as ShoppingListFormType, shoppingListForm } from '../forms';
import { ShoppingList } from '../models/shoppingList';
import { getShoppingListFormWithErrors } from '../utils/getShoppingListFormWithErrors';

export type ShoppingListBody<T> = T & {
  meals: {
    mealId: string;
    quantity: string;
  }[];
  products: {
    productId: string;
    quantity: number;
    unit: Unit
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
    const meals: { meal: MealDoc; quantity: number }[] = await getMealsById(mealsBody);

    const shoppingList = new ShoppingList({
      ...shoppingListBody,
      author: user!.id,
      meals,
      additionalProducts: [],
    });

    try {
      await shoppingList.save();
    } catch {
      set.status = 'Bad Request';
      throw new Error('Failed to create meal');
    }

    set.status = 'Created';

    set.headers = {
      [HxResponseHeader.Location]: getPath(`/shopping-lists/${shoppingList.id}`, { groupByMeals: 'on' }),
    };
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
