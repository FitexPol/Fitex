import { Elysia } from 'elysia';

import { NotificationError } from '@errors/NotificationError';

import { mealContext } from './context';
import { MealCard } from '../components/MealCard';

export const toggleVisibilityState = new Elysia()
  .use(mealContext)
  .patch('/visibility-state', async ({ mealDoc }) => {
    mealDoc.isVisible = !mealDoc.isVisible;

    try {
      await mealDoc.save();
    } catch {
      throw new NotificationError('Mongo Error');
    }

    return <MealCard mealDoc={mealDoc} />;
  });
