import { Elysia } from 'elysia';

import { NotificationError } from '@errors/NotificationError';
import { $t } from '@utils/$t';
import { getBodySchema } from '@utils/api/getBodySchema';
import { getBodySchemaErrors } from '@utils/api/getBodySchemaErrors';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { mealContext } from './context';
import { NameForm } from '../components/forms/NameForm';
import { type NameForm as NameFormType, nameForm } from '../forms/name';

export const updateName = new Elysia().use(mealContext).patch(
  '',
  async ({ mealDoc, body, set }) => {
    try {
      await mealDoc.updateOne({
        name: body.name,
      });
    } catch {
      throw new NotificationError('Mongo Error');
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader('success', $t('_updateName.success'));
    set.headers[HxResponseHeader.Location] = `/meals/${mealDoc.id}`;
  },
  {
    body: getBodySchema<NameFormType>(nameForm),
    error({ code, error }) {
      switch (code) {
        case 'VALIDATION':
          return <NameForm errors={getBodySchemaErrors<NameFormType>(error, nameForm)} />;
      }
    },
  },
);
