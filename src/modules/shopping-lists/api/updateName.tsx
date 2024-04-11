import { Elysia } from 'elysia';

import { NotificationError } from '@errors/NotificationError';
import { $t } from '@utils/$t';
import { getBodySchemaErrors } from '@utils/api/getBodySchemaErrors';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { shoppingListContext } from './context';
import { NameForm } from '../components/forms/NameForm';
import { shoppingListNameDTO } from '../dto/shoppingListName';

export const updateName = new Elysia().use(shoppingListContext).patch(
  '',
  async ({ shoppingListDoc, set, body }) => {
    try {
      await shoppingListDoc.updateOne({
        name: body.name,
      });
    } catch {
      throw new NotificationError('Mongo Error');
    }

    set.headers[HxResponseHeader.Trigger] = getNotificationHeader('success', $t('_updateName.success'));
    set.headers[HxResponseHeader.Location] = `/shopping-lists/${shoppingListDoc.id}`;
  },
  {
    body: shoppingListNameDTO,
    error({ code, error }) {
      switch (code) {
        case 'VALIDATION':
          return <NameForm errors={getBodySchemaErrors(error, shoppingListNameDTO)} />;
      }
    },
  },
);
