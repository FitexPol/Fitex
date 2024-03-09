import { Elysia } from 'elysia';

import { context } from '@/context';
import { $t } from '@utils/$t';
import { getNotificationHeader } from '@utils/getNotificationHeader';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';
import { HxResponseHeader } from '@vars';

import { MealFieldset } from '../components/MealFieldset';
import { Meal } from '../models/meal';

const _t = $t('meals');

export const getMealFieldset = new Elysia().use(context).get('/fieldset', async ({ query, set }) => {
  const mealId = getQueryParamSecure(query.mealId);

  if (!mealId) {
    set.status = 'Bad Request';
    set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
      'error',
      _t('getMealFieldset.errors.mealId'),
    );

    return;
  }

  const mealDoc = await Meal.findById(mealId);

  if (!mealDoc) {
    set.status = 'Not Found';
    set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', _t('_shared.errors.notFound'));

    return;
  }

  return (
    <li>
      <MealFieldset mealDoc={mealDoc} quantity={1} />
    </li>
  );
});
