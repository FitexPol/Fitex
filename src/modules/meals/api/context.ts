import { Elysia } from 'elysia';

import { context } from '@/context';
import { $t } from '@utils/$t';
import { NotificationError } from '@utils/errors/NotificationError';

import { Meal } from '../models/meal';

export const mealContext = new Elysia()
  .use(context)
  .derive({ as: 'scoped' }, async ({ params: { id }, user }) => {
    const mealDoc = await Meal.findById(id).exec();

    if (!mealDoc) throw new NotificationError({ status: 404, message: $t('_errors.notFound') });

    if (!mealDoc.author._id.equals(user!.id))
      throw new NotificationError({ status: 403, message: $t('_errors.permissionDenied') });

    return {
      mealDoc,
    };
  });
