import { Elysia } from 'elysia';

import { context } from '@/context';
import { $t } from '@utils/$t';
import { NotificationError } from '@utils/errors/NotificationError';

import { mealContext } from './context';
import { MealCard } from '../components/MealCard';

export const toggleVisibilityState = new Elysia()
  .use(context)
  .use(mealContext)
  .patch('visibility-state', async ({ mealDoc }) => {
    mealDoc.isVisible = !mealDoc.isVisible;

    try {
      await mealDoc.save();
    } catch {
      throw new NotificationError({ status: 500, message: $t('_errors.mongoError') });
    }

    return <MealCard mealDoc={mealDoc} />;
  });
