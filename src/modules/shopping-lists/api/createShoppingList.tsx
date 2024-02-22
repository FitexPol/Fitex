import { Elysia, type ValidationError } from 'elysia';

import { context } from '@/context';
import { type User } from '@auth/models/user';
import { Meal } from '@meals/models/meal';
import { getBodySchema } from '@utils/getBodySchema';
import { getBodySchemaErrors } from '@utils/getBodySchemaErrors';
import { getParsedBody } from '@utils/getParsedBody';
import { HxResponseHeader } from '@vars';

import { ShoppingListForm } from '../components/ShoppingListForm';
import {
  type ShoppingListFormErrors,
  type ShoppingListForm as ShoppingListFormType,
  shoppingListForm,
} from '../forms';
import { ShoppingList } from '../models/shoppingList';

type ShoppingListBody<T> = T & {
  meals: {
    id: string;
    quantity: string;
  }[];
  ingredients: ShoppingList['ingredients'];
};

export const createShoppingList = new Elysia().use(context).post(
  '',
  async ({ body, user, set }) => {
    const { meals: mealsBody, ...shoppingListBody } =
      getParsedBody<ShoppingListBody<Omit<typeof body, 'meals' | 'ingredients'>>>(body);

    const mealDocs = await Meal.find({ _id: { $in: mealsBody.map(({ id }) => id) } });

    const meals: ShoppingList['meals'] = mealDocs.reduce(
      (acc, mealDoc) => {
        const meal = mealsBody.find(({ id }) => id === mealDoc.id);

        if (!meal) return acc;

        acc.push({
          meal: mealDoc,
          quantity: Number(meal.quantity),
        });

        return acc;
      },
      [] as ShoppingList['meals'],
    );

    const shoppingList = new ShoppingList({
      ...shoppingListBody,
      author: user!.id,
      meals,
    });

    try {
      await shoppingList.save();
    } catch {
      set.status = 'Bad Request';
      throw new Error('Failed to create meal');
    }

    set.status = 'Created';

    set.headers = {
      [HxResponseHeader.Location]: `/shopping-lists/${shoppingList.id}`,
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

export function getShoppingListFormWithErrors(error: Readonly<ValidationError>, user: User): JSX.Element {
  const errors: ShoppingListFormErrors = getBodySchemaErrors<ShoppingListFormType>(error, shoppingListForm);

  return <ShoppingListForm user={user} errors={errors} />;
}
