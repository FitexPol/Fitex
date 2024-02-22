import { Elysia } from 'elysia';

import { context } from '@/context';
import { getBodySchema } from '@utils/getBodySchema';
import { getGroupedIngredients } from '@utils/getGroupedIngredients';
import { getParsedBody } from '@utils/getParsedBody';
import { HxResponseHeader } from '@vars';

import { type MealForm as MealFormType, mealForm } from '../forms';
import { Meal } from '../models/meal';
import { getMealFormWithErrors } from '../utils/getMealFormWithErrors';

export type MealBody<T> = T & { ingredients: Meal['ingredients'] };

export const createMeal = new Elysia().use(context).post(
  '',
  async ({ body, user, set }) => {
    const { ingredients: ingredientsBody, ...mealBody } =
      getParsedBody<MealBody<Omit<typeof body, 'ingredients'>>>(body);

    const meal = new Meal({
      ...mealBody,
      author: user!.id,
      ingredients: getGroupedIngredients(ingredientsBody),
    });

    try {
      await meal.save();
    } catch {
      set.status = 'Bad Request';
      throw new Error('Failed to create meal');
    }

    set.status = 'Created';
    set.headers = {
      [HxResponseHeader.Location]: `/meals/${meal.id}`,
    };
  },
  {
    body: getBodySchema<MealFormType>(mealForm),
    error({ code, error }) {
      if (code === 'VALIDATION') {
        return getMealFormWithErrors(error);
      }
    },
  },
);
