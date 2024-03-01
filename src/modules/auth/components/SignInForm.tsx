import { Button } from '@components/Button';
import { Input } from '@components/inputs/Input';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { type SignInFormErrors, signInForm } from '../forms';

const _t = $t('auth');

type SignInFormProps = {
  errors?: SignInFormErrors;
};

export function SignInForm({ errors }: ComponentProps<SignInFormProps>) {
  return (
    <form hx-post="/api/auth/sign-in" hx-swap="outerHTML" hx-target-4xx="this">
      <Input control={signInForm.username} label={_t('_shared.username')} error={errors?.username} />
      <Input control={signInForm.password} label={_t('_shared.password')} error={errors?.password} />

      <Button type="submit">{_t('signInForm.submit')}</Button>
    </form>
  );
}
