import { Elysia } from 'elysia';

import { context } from '@/context';
import { getBodySchema } from '@utils/getBodySchema';
import { getGroupedIngredients } from '@utils/getGroupedIngredients';
import { getParsedBody } from '@utils/getParsedBody';
import { getPath } from '@utils/getPath';
import { HxResponseHeader } from '@vars';

import { type ShoppingListForm as ShoppingListFormType, shoppingListForm } from '../forms';
import { ShoppingList, type ShoppingListDoc } from '../models/shoppingList';
import { getMealsByIds } from '../utils/getMealsByIds';
import { getShoppingListFormWithErrors } from '../utils/getShoppingListFormWithErrors';

export type ShoppingListBody<T> = T & {
  meals: {
    id: string;
    quantity: string;
  }[];
  ingredients: ShoppingListDoc['additionalIngredients'];
};

export const createShoppingList = new Elysia().use(context).post(
  '',
  async ({ body, user, set }) => {
    const {
      meals: mealsBody,
      ingredients: ingredientsBody,
      ...shoppingListBody
    } = getParsedBody<ShoppingListBody<Omit<typeof body, 'meals' | 'ingredients'>>>(body);
    const meals: ShoppingListDoc['meals'] = await getMealsByIds(mealsBody);

    const shoppingList = new ShoppingList({
      ...shoppingListBody,
      author: user!.id,
      meals,
      additionalIngredients: getGroupedIngredients(ingredientsBody),
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
