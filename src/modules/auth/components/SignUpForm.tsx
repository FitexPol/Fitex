import { Button } from '@components/Button';
import { Input } from '@components/Input';
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
      <Input control={signUpForm.username} error={errors?.username} />
      <Input control={signUpForm.password} error={errors?.password} />
      <Input control={signUpForm.repeatedPassword} error={errors?.repeatedPassword} />

      <Button type="submit" class="contrast">
        {_t('signUpForm.submit')}
      </Button>
    </form>
  );
}
