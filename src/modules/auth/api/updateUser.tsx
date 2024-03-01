import { Elysia, type ValidationError } from 'elysia';

import { context } from '@/context';
import { $t } from '@utils/$t';
import { getBodySchema } from '@utils/getBodySchema';
import { getBodySchemaErrors } from '@utils/getBodySchemaErrors';
import { getNotificationHeader } from '@utils/getNotificationHeader';
import { HxEvent, HxResponseHeader } from '@vars';

import { UserForm } from '../components/UserForm';
import { Users } from '../components/Users';
import { type UserFormErrors, type UserForm as UserFormType, userForm } from '../forms';
import { User } from '../models/user';

const _t = $t('auth');
const _tShared = $t('_shared');

export const updateUser = new Elysia().use(context).patch(
  ':id',
  async ({ params: { id }, body, set }) => {
    const userDoc = await User.findById(id);

    if (!userDoc) {
      set.status = 'Not Found';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', _t('_shared.errors.notFound'));

      return;
    }

    try {
      await userDoc.updateOne({ roles: [body.roles] });
    } catch {
      set.status = 'Bad Request';
      set.headers[HxResponseHeader.Trigger] = getNotificationHeader(
        'error',
        _tShared('_shared.errors.badRequest'),
      );

      return;
    }

    set.headers[HxResponseHeader.TriggerAfterSwap] = HxEvent.CloseModal;

    return <Users />;
  },
  {
    body: getBodySchema<UserFormType>(userForm),
    error: async ({ code, error }) => {
      if (code === 'VALIDATION') {
        return getUserFormWithErrors(error);
      }
    },
  },
);

function getUserFormWithErrors(error: Readonly<ValidationError>): JSX.Element {
  const errors: UserFormErrors = getBodySchemaErrors<UserFormType>(error, userForm);

  return <UserForm errors={errors} />;
}
