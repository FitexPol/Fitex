import { Button } from '@components/Button';
import { Input } from '@components/inputs/Input';
import { $t } from '@utils/$t';

import { type SignUpFormErrors, signUpForm } from '../../forms/signUp';

type SignUpFormProps = {
  errors?: SignUpFormErrors;
};

export function SignUpForm({ errors }: SignUpFormProps) {
  return (
    <form hx-post="/api/auth/sign-up" hx-swap="outerHTML" hx-target-4xx="this">
      <Input control={signUpForm.username} label={$t('auth.username')} error={errors?.username} />
      <Input control={signUpForm.password} label={$t('auth.password')} error={errors?.password} />

      <Input
        control={signUpForm.repeatedPassword}
        label={$t('auth.signUp.repeatedPassword')}
        error={errors?.repeatedPassword}
      />

      <Button type="submit">{$t('_submit')}</Button>
    </form>
  );
}
