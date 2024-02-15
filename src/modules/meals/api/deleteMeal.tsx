import { Elysia } from 'elysia';

import { context } from '@/context';
import { HxRequestHeader, HxResponseHeader } from '@vars';

import { MealsSection } from '../components/MealsSection';
import { Meal } from '../models/meal';

export const deleteMeal = new Elysia()
  .use(context)
  .delete('/:id', async ({ user, set, params: { id }, request }) => {
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
      await mealDoc.deleteOne();
    } catch {
      set.status = 'Bad Request';
      throw new Error('Failed to update meal');
    }

    const currentUrl = request.headers.get(HxRequestHeader.CurrentUrl);

    if (currentUrl && currentUrl.includes('/meal/')) {
      set.headers = {
        [HxResponseHeader.Location]: '/meals',
      };

      return;
    }

    return <MealsSection user={user!} sortQuery="" />;
  });
