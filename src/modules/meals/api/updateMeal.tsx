import { Elysia } from 'elysia';

import { context } from '@/context';
import { getBodySchema } from '@utils/getBodySchema';
import { getGroupedIngredients } from '@utils/getGroupedIngredients';
import { getParsedBody } from '@utils/getParsedBody';
import { HxResponseHeader } from '@vars';

import { type MealBody } from './createMeal';
import { type MealForm as MealFormType, mealForm } from '../forms';
import { Meal } from '../models/meal';
import { getMealFormWithErrors } from '../utils/getMealFormWithErrors';

export const updateMeal = new Elysia().use(context).patch(
  '/:id',
  async ({ body, user, set, params: { id } }) => {
    const { ingredients: ingredientsBody, ...mealBody } =
      getParsedBody<MealBody<Omit<typeof body, 'ingredients'>>>(body);
    const mealDoc = await Meal.findById(id).exec();

    if (!mealDoc) {
      set.status = 'Not Found';
      throw new Error('Meal not found');
    }

    if (!mealDoc.author._id.equals(user!.id)) {
      set.status = 'Forbidden';
      throw new Error('You are not authorized to update this meal');
    }

    try {
      await mealDoc.updateOne({ ...mealBody, ingredients: getGroupedIngredients(ingredientsBody) });
    } catch {
      set.status = 'Bad Request';
      throw new Error('Failed to update meal');
    }

    set.headers = {
      [HxResponseHeader.Location]: `/meals/${mealDoc.id}`,
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
