import { Elysia } from 'elysia';

import { NotificationError } from '@errors/NotificationError';
import { $t } from '@utils/$t';
import { getBodySchema } from '@utils/api/getBodySchema';
import { getBodySchemaErrors } from '@utils/api/getBodySchemaErrors';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { mealContext } from './context';
import { BasicInformationForm } from '../components/forms/BasicInformationForm';
import {
  type BasicInformationForm as BasicInformationFormType,
  basicInformationForm,
} from '../forms/basicInformation';

export const updateBasicInformation = new Elysia().use(mealContext).patch(
  '',
  async ({ mealDoc, body, set }) => {
    try {
      await mealDoc.updateOne({
        name: body.name,
        description: body.description,
      });
    } catch {
      throw new NotificationError('Mongo Error');
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
      'success',
      $t('_basicInformation.updateBasicInformation.success'),
    );

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
