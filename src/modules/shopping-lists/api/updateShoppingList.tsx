import { Elysia } from 'elysia';

import { context } from '@/context';
import { getMealsById } from '@meals/utils/getMealsById';
import { getBodySchema } from '@utils/getBodySchema';
import { getParsedBody } from '@utils/getParsedBody';
import { getPath } from '@utils/getPath';
import { HxResponseHeader } from '@vars';

import { type ShoppingListBody } from './createShoppingList';
import { type ShoppingListForm as ShoppingListFormType, shoppingListForm } from '../forms';
import { ShoppingList, type ShoppingListDoc } from '../models/shoppingList';
import { getShoppingListFormWithErrors } from '../utils/getShoppingListFormWithErrors';

export const updateShoppingList = new Elysia().use(context).patch(
  '/:id',
  async ({ body, user, set, params: { id } }) => {
    const {
      meals: mealsBody,
      products: productsBody,
      ...shoppingListBody
    } = getParsedBody<ShoppingListBody<Omit<typeof body, 'meals' | 'additionalProducts'>>>(body);
    const shoppingListDoc = await ShoppingList.findById(id).exec();

    if (!shoppingListDoc) {
      set.status = 'Not Found';
      throw new Error('Shopping list not found');
    }

    if (!shoppingListDoc.author._id.equals(user!.id)) {
      set.status = 'Forbidden';
      throw new Error('You are not authorized to update this shopping list');
    }

    const meals: ShoppingListDoc['meals'] = await getMealsById(mealsBody);

    try {
      await shoppingListDoc.updateOne({
        ...shoppingListBody,
        meals,
        additionalProducts: [],
      });
    } catch {
      set.status = 'Bad Request';
      throw new Error('Failed to update meal');
    }

    set.headers = {
      [HxResponseHeader.Location]: getPath(`/shopping-lists/${shoppingListDoc.id}`, { groupByMeals: 'on' }),
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
