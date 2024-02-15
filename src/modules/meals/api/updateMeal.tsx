import { Elysia } from 'elysia';

import { context } from '@/context';
import { getBodySchema } from '@utils/getBodySchema';
import { getParsedBody } from '@utils/getParsedBody';
import { HxEvent, HxRequestHeader, HxResponseHeader } from '@vars';

import { MealSection } from '../components/MealSection';
import { MealsSection } from '../components/MealsSection';
import { type MealForm as MealFormType, mealForm } from '../forms';
import { Meal } from '../models/meal';
import { getMealFormWithErrors } from '../utils/getMealFormWithErrors';

export const updateMeal = new Elysia().use(context).put(
  '/:id',
  async ({ body, user, set, params: { id }, request }) => {
    const mealBody = getParsedBody<Omit<typeof body, 'ingredients'> & { ingredients: Meal['ingredients'] }>(
      body,
    );

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
      await mealDoc.updateOne(mealBody);
    } catch {
      set.status = 'Bad Request';
      throw new Error('Failed to update meal');
    }

    const baseHeader = { [HxResponseHeader.TriggerAfterSwap]: HxEvent.CloseModal };
    const currentUrl = request.headers.get(HxRequestHeader.CurrentUrl);

    if (currentUrl && currentUrl.includes('/meal/')) {
      set.headers = {
        ...baseHeader,
        [HxResponseHeader.Retarget]: '#meal-section',
      };

      return <MealSection user={user!} mealId={mealDoc.id} />;
    }

    set.headers = { ...baseHeader };

    return <MealsSection user={user!} sortQuery="" />;
  },
  {
    body: getBodySchema<MealFormType>(mealForm),
    error({ code, error, set }) {
      if (code === 'VALIDATION') {
        set.headers = {
          [HxResponseHeader.Retarget]: '#meal-form',
          [HxResponseHeader.Reswap]: 'outerHTML',
        };

        return getMealFormWithErrors(error);
      }
    },
  },
);
