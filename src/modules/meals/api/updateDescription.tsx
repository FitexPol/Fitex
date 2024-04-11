import { Elysia } from 'elysia';

import { NotificationError } from '@errors/NotificationError';
import { $t } from '@utils/$t';
import { getBodySchemaErrors } from '@utils/api/getBodySchemaErrors';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { mealContext } from './context';
import { DescriptionForm } from '../components/forms/DescriptionForm';
import { mealDescriptionDTO } from '../dto/mealDescription';

export const updateDescription = new Elysia().use(mealContext).patch(
  '/description',
  async ({ mealDoc, body, set }) => {
    try {
      await mealDoc.updateOne({
        description: body.description,
      });
    } catch {
      throw new NotificationError('Mongo Error');
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
      'success',
      $t('meals.updateDescription.success'),
    );

    set.headers[HxResponseHeader.Location] = `/meals/${mealDoc.id}`;
  },
  {
    body: mealDescriptionDTO,
    error({ code, mealDoc, error }) {
      switch (code) {
        case 'VALIDATION':
          return (
            <DescriptionForm mealDoc={mealDoc} errors={getBodySchemaErrors(error, mealDescriptionDTO)} />
          );
      }
    },
  },
);
