import { Elysia } from 'elysia';

import { context } from '@/context';
import { MealFieldset } from '@meals/components/MealFieldset';

import { getMealOptions } from '../../meals/utils/getMealOptions';

export const getMealFieldset = new Elysia().use(context).get('/meal-fieldset', async ({ user }) => {
  const mealOptions = await getMealOptions(user!);

  return (
    <li>
      <MealFieldset mealOptions={mealOptions} />
    </li>
  );
});
