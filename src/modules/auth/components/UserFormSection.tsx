import { Card } from '@components/Card';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { UserForm } from './UserForm';
import { User } from '../models/user';

const _t = $t('auth');

type UserFormSectionProps = {
  userId?: string;
};

export async function UserFormSection({ userId }: ComponentProps<UserFormSectionProps>) {
  const userDoc = await User.findById(userId).exec();

  if (!userDoc) {
    return <span>{_t('_shared.errors.notFound')}</span>;
  }

  return (
    <section id="user-form-section">
      <Card>
        <>
          <Card.Header title={<h1 class="mb-0 text-2xl">{userDoc.username}</h1>} />
          <UserForm userDoc={userDoc} />
        </>
      </Card>
    </section>
  );
}
