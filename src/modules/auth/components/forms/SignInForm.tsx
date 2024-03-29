import { Button } from '@components/Button';
import { Input } from '@components/inputs/Input';
import { $t } from '@utils/$t';

import { type SignInFormErrors, signInForm } from '../../forms/signIn';

type SignInFormProps = {
  errors?: SignInFormErrors;
};

export function SignInForm({ errors }: SignInFormProps) {
  return (
    <form hx-post="/api/auth/sign-in" hx-swap="outerHTML" hx-target-4xx="this">
      <Input control={signInForm.username} label={$t('auth.username')} error={errors?.username} />
      <Input control={signInForm.password} label={$t('auth.password')} error={errors?.password} />

      <Button type="submit">{$t('_submit')}</Button>
    </form>
  );
}
