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

export const updateBasicInformation = new Elysia().use(context).patch(
  '',
  async ({ params: { id }, set, user, body }) => {
    const mealDoc = await Meal.findById(id).exec();

    if (!mealDoc) {
      set.status = 'Not Found';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', _t('_shared.errors.notFound'));

      return;
    }

    if (!mealDoc.author._id.equals(user!.id)) {
      set.status = 'Forbidden';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
        'error',
        _t('_shared.errors.permissionDenied'),
      );

      return;
    }

    try {
      await mealDoc.updateOne({
        name: body.name,
        description: body.description,
      });
    } catch {
      set.status = 'Bad Request';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
        'error',
        _tShared('_shared.errors.badRequest'),
      );

      return;
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
      'success',
      _t('updateBasicInformation.success'),
    );

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
