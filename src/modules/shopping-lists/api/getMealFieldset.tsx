import { Elysia } from 'elysia';

import { context } from '@/context';

import { MealFieldset } from '../components/MealFieldset';
import { getMealOptions } from '../utils/getMealOptions';

export const getMealFieldset = new Elysia().use(context).get('/meal-fieldset', async ({ user }) => {
  const mealOptions = await getMealOptions(user!);

  return (
    <li>
      <MealFieldset mealOptions={mealOptions} />
    </li>
  );
});
