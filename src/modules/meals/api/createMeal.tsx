import { Elysia } from 'elysia';

import { userContext } from '@auth/api/context';
import { NotificationError } from '@errors/NotificationError';
import { $t } from '@utils/$t';
import { getBodySchemaErrors } from '@utils/api/getBodySchemaErrors';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { NameForm } from '../components/forms/NameForm';
import { mealNameDTO } from '../dto/mealName';
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
    body: mealNameDTO,
    error({ code, error }) {
      switch (code) {
        case 'VALIDATION':
          return <NameForm errors={getBodySchemaErrors(error, mealNameDTO)} />;
      }
    },
  },
);
