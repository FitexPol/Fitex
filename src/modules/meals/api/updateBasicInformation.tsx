import { Elysia } from 'elysia';

import { context } from '@/context';
import { $t } from '@utils/$t';
import { getBodySchema } from '@utils/api/getBodySchema';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { type BasicInformationForm, basicInformationForm } from '../forms/basicInformation';
import { Meal } from '../models/meal';
import { getBasicInformationFormWithErrors } from '../utils/getBasicInformationFormWithErrors';

export const updateBasicInformation = new Elysia().use(context).patch(
  '',
  async ({ params: { id }, set, user, body }) => {
    const mealDoc = await Meal.findById(id).exec();

    if (!mealDoc) {
      set.status = 'Not Found';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', $t('_errors.notFound'));

      return;
    }

    if (!mealDoc.author._id.equals(user!.id)) {
      set.status = 'Forbidden';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', $t('_errors.permissionDenied'));

      return;
    }

    try {
      await mealDoc.updateOne({
        name: body.name,
        description: body.description,
      });
    } catch {
      set.status = 'Bad Request';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', $t('_errors.badRequest'));

      return;
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
      'success',
      $t('_basicInformation.updateBasicInformation.success'),
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
