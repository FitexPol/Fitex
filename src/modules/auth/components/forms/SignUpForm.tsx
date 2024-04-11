import { Button } from '@components/Button';
import { Input } from '@components/inputs/Input';
import { type FormErrors } from '@types';
import { $t } from '@utils/$t';

import { signUpDTO } from '../../dto/signUp';

type SignUpFormProps = {
  errors?: FormErrors<typeof signUpDTO>;
};

export function SignUpForm({ errors }: SignUpFormProps) {
  return (
    <form hx-post="/api/auth/sign-up" hx-swap="outerHTML">
      <Input dto={signUpDTO} name="username" label={$t('auth.username')} error={errors?.username} />

      <Input
        dto={signUpDTO}
        name="password"
        type="password"
        label={$t('auth.password')}
        error={errors?.password}
      />

      <Input
        dto={signUpDTO}
        name="repeatedPassword"
        type="password"
        label={$t('auth.signUp.repeatedPassword')}
        error={errors?.repeatedPassword}
      />

      <Button type="submit">{Html.escapeHtml($t('_submit'))}</Button>
    </form>
  );
}
