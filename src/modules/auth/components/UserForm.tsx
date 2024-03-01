import { Button } from '@components/Button';
import { Select } from '@components/inputs/Select';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { type UserFormErrors, userForm } from '../forms';
import { Role, type UserDoc } from '../models/user';

const _t = $t('auth');
const _tShared = $t('_shared');

type UserFormProps = {
  userDoc?: UserDoc;
  errors?: UserFormErrors;
};

export async function UserForm({ userDoc, errors }: ComponentProps<UserFormProps>) {
  return (
    <form hx-patch={`/api/auth/users/${userDoc?.id}`} hx-target="closest section" hx-swap="outerHTML">
      <Select
        control={userForm.roles}
        options={Object.values(Role).map((value) => ({
          label: value,
          value,
        }))}
        value={userDoc?.roles[0]}
        label={_t('_shared.roles')}
        error={errors?.roles}
      />

      <Button type="submit">{_tShared('_shared.forms.submit')}</Button>
    </form>
  );
}
