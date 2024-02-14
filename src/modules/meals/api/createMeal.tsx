import { Elysia } from 'elysia';

import { context } from '@/context';
import { getBodySchema } from '@utils/getBodySchema';
import { getParsedBody } from '@utils/getParsedBody';

import { Meals } from '../components/Meals';
import { type MealForm as MealFormType, mealForm } from '../forms';
import { Meal } from '../models/meal';
import { getMealFormWithErrors } from '../utils/getMealFormWithErrors';

export const createMeal = new Elysia().use(context).post(
  '',
  async ({ body, user, set }) => {
    const mealBody = getParsedBody<Omit<typeof body, 'ingredients'> & { ingredients: Meal['ingredients'] }>(
      body,
    );
    const meal = new Meal({ author: user!.id, ...mealBody });

    try {
      await meal.save();
    } catch {
      set.status = 'Bad Request';
      throw new Error('Failed to create meal');
    }

    set.headers = {
      'HX-Trigger-After-Swap': 'closeModal',
    };

    return <Meals user={user!} />;
  },
  {
    body: getBodySchema<MealFormType>(mealForm),
    error({ code, error, set }) {
      if (code === 'VALIDATION') {
        set.headers = {
          'HX-Retarget': '#meal-form',
          'HX-Reswap': 'outerHTML',
        };

        return getMealFormWithErrors(error);
      }
    },
  },
);
