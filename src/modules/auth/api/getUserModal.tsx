import { Elysia } from 'elysia';

import { context } from '@/context';
import { Modal } from '@components/Modal';
import { $t } from '@utils/$t';
import { getNotificationHeader } from '@utils/getNotificationHeader';
import { HxEvent, HxResponseHeader } from '@vars';

import { UserForm } from '../components/UserForm';
import { User } from '../models/user';

const _t = $t('auth');

export const getUserModal = new Elysia().use(context).get(':id/modal', async ({ params: { id }, set }) => {
  const userDoc = await User.findById(id);

  if (!userDoc) {
    set.status = 'Not Found';
    set.headers[HxResponseHeader.Trigger] = getNotificationHeader('error', _t('_shared.errors.notFound'));

    return;
  }

  set.headers[HxResponseHeader.TriggerAfterSwap] = HxEvent.ShowModal;

  return (
    <Modal title={userDoc.username}>
      <UserForm userDoc={userDoc} />
    </Modal>
  );
});
