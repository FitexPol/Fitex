import { Elysia } from 'elysia';

import { userContext } from '@auth/api/context';
import { NotificationError } from '@errors/NotificationError';
import { $t } from '@utils/$t';
import { getBodySchema } from '@utils/api/getBodySchema';
import { getBodySchemaErrors } from '@utils/api/getBodySchemaErrors';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { NameForm } from '../components/forms/NameForm';
import { type NameForm as NameFormType, nameForm } from '../forms/name';
import { Meal } from '../models/meal';

export const createMeal = new Elysia().use(userContext).post(
  '',
  async ({ body, user, set }) => {
    const mealDoc = new Meal({
      name: body.name,
      author: user.id,
    });

    try {
      await mealDoc.save();
    } catch {
      throw new NotificationError('Mongo Error');
    }

    set.status = 'Created';
    set.headers[HxResponseHeader.Trigger] = getNotificationHeader('success', $t('meals.createMeal.success'));
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
