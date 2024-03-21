import { Elysia } from 'elysia';

import { context } from '@/context';
import { $t } from '@utils/$t';
import { getBodySchema } from '@utils/api/getBodySchema';
import { getBodySchemaErrors } from '@utils/api/getBodySchemaErrors';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { NotificationError } from '@utils/errors/NotificationError';
import { HxResponseHeader } from '@vars';

import { BasicInformationForm } from '../components/forms/BasicInformationForm';
import {
  type BasicInformationForm as BasicInformationFormType,
  basicInformationForm,
} from '../forms/basicInformation';
import { Meal } from '../models/meal';

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
      throw new NotificationError({ status: 500, message: $t('_errors.mongoError') });
    }

    set.status = 'Created';
    set.headers[HxResponseHeader.Trigger] = getNotificationHeader('success', $t('meals.createMeal.success'));
    set.headers[HxResponseHeader.Location] = `/meals/${mealDoc.id}`;
  },
  {
    body: getBodySchema<BasicInformationFormType>(basicInformationForm),
    error({ code, error }) {
      switch (code) {
        case 'VALIDATION':
          return (
            <BasicInformationForm
              errors={getBodySchemaErrors<BasicInformationFormType>(error, basicInformationForm)}
            />
          );
      }
    },
  },
);
