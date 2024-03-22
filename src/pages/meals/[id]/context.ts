/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Elysia } from 'elysia';

import { PageNotFoundError } from '@errors/PageNotFoundError';
import { PageNotPermittedError } from '@errors/PageNotPermitted';
import { Meal } from '@meals/models/meal';

import { userContext } from '../../context';

export const mealContext = (app: Elysia) =>
  app.use(userContext).derive({ as: 'scoped' }, async ({ params: { id }, user }) => {
    const mealDoc = await Meal.findById(id).exec();

    if (!mealDoc) throw new PageNotFoundError();
    if (!mealDoc.author._id.equals(user.id)) throw new PageNotPermittedError();

    return {
      mealDoc,
      user,
    };
  });
