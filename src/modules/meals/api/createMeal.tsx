import { Elysia } from 'elysia';

import { context } from '@/context';
import { $t } from '@utils/$t';
import { getBodySchema } from '@utils/getBodySchema';
import { getNotificationHeader } from '@utils/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { type BasicInformationForm, basicInformationForm } from '../forms/basic-information';
import { Meal } from '../models/meal';
import { getBasicInformationFormWithErrors } from '../utils/getBasicInformationFormWithErrors';

const _t = $t('meals');
const _tShared = $t('_shared');

export const createMeal = new Elysia().use(context).post(
  '',
  async ({ body, user, set }) => {
    const mealDoc = new Meal({
      name: body.name,
      description: body.description,
      author: user!.id,
    });

    try {
      await mealDoc.save();
    } catch {
      set.status = 'Bad Request';

      set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
        'error',
        _tShared('_shared.errors.badRequest'),
      );

      return;
    }

    set.status = 'Created';
    set.headers[HxResponseHeader.Trigger] = getNotificationHeader('success', _t('createMeal.success'));
    set.headers[HxResponseHeader.Location] = `/meals/${mealDoc.id}/edit`;
  },
  {
    body: getBodySchema<BasicInformationForm>(basicInformationForm),
    error({ code, error }) {
      if (code === 'VALIDATION') {
        return getBasicInformationFormWithErrors(error);
      }
    },
  },
);
