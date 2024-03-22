/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Elysia } from 'elysia';

import { userContext } from '@auth/api/context';
import { NotificationError } from '@errors/NotificationError';

import { Meal } from '../models/meal';

export const mealContext = (app: Elysia) =>
  app.use(userContext).derive({ as: 'scoped' }, async ({ params: { id }, user }) => {
    const mealDoc = await Meal.findById(id).exec();

    if (!mealDoc) throw new NotificationError('Not Found');

    if (!mealDoc.author._id.equals(user.id)) throw new NotificationError('Permission Denied');

    return {
      mealDoc,
      user,
    };
  });
