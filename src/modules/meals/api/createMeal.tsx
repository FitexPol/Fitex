import { Elysia } from 'elysia';

import { context } from '@/context';
import { getBodySchema } from '@utils/getBodySchema';
import { getParsedBody } from '@utils/getParsedBody';
import { getQueryParams } from '@utils/getQueryParams';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';
import { HxEvent, HxRequestHeader, HxResponseHeader } from '@vars';

import { MealsSection } from '../components/MealsSection';
import { type MealForm as MealFormType, mealForm } from '../forms';
import { Meal } from '../models/meal';
import { getMealFormWithErrors } from '../utils/getMealFormWithErrors';

export const createMeal = new Elysia().use(context).post(
  '',
  async ({ body, user, set, request }) => {
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

    set.status = 'Created';
    set.headers = {
      [HxResponseHeader.TriggerAfterSwap]: HxEvent.CloseModal,
    };

    const queryParams = getQueryParams(request.headers.get(HxRequestHeader.CurrentUrl));

    return (
      <MealsSection
        user={user!}
        sortQuery={getQueryParamSecure(queryParams.sort)}
        itemsPerPageQuery={getQueryParamSecure(queryParams.itemsPerPage)}
        pageQuery={getQueryParamSecure(queryParams.page)}
      />
    );
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
