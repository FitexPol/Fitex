import { Button } from '@components/Button';
import { Input } from '@components/inputs/Input';
import type { ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { type SignUpFormErrors, signUpForm } from '../forms';

const _t = $t('auth');

type SignUpFormProps = {
  errors?: SignUpFormErrors;
};

export function SignUpForm({ errors }: ComponentProps<SignUpFormProps>) {
  return (
    <form hx-post="/api/auth/sign-up" hx-swap="outerHTML" hx-target-4xx="this">
      <Input control={signUpForm.username} label={_t('_shared.username')} error={errors?.username} />
      <Input control={signUpForm.password} label={_t('_shared.password')} error={errors?.password} />

      <Input
        control={signUpForm.repeatedPassword}
        label={_t('signUpForm.repeatedPassword')}
        error={errors?.repeatedPassword}
      />

      <Button type="submit">{_t('signUpForm.submit')}</Button>
    </form>
  );
}
