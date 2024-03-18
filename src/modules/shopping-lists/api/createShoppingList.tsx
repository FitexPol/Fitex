import { Elysia } from 'elysia';

import { context } from '@/context';
import { $t } from '@utils/$t';
import { getBodySchema } from '@utils/api/getBodySchema';
import { getNotificationHeader } from '@utils/api/getNotificationHeader';
import { HxResponseHeader } from '@vars';

import { type BasicInformationForm, basicInformationForm } from '../forms/basicInformation';
import { ShoppingList } from '../models/shoppingList';
import { getBasicInformationFormWithErrors } from '../utils/getBasicInformationFormWithErrors';

export const createShoppingList = new Elysia().use(context).post(
  '',
  async ({ body, user, set }) => {
    const shoppingListDoc = new ShoppingList({
      name: body.name,
      author: user!.id,
    });

    try {
      await shoppingListDoc.save();
    } catch {
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', $t('_errors.badRequest'));

      return;
    }

    set.status = 'Created';
    set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
      'success',
      $t('shoppingLists.createShoppingList.success'),
    );
    set.headers[HxResponseHeader.Location] = `/shopping-lists/${shoppingListDoc.id}/edit`;
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
