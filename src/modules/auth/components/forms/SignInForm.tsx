import { Button } from '@components/Button';
import { Input } from '@components/inputs/Input';
import { type FormErrors } from '@types';
import { $t } from '@utils/$t';

import { signInDTO } from '../../dto/signIn';

type SignInFormProps = {
  errors?: FormErrors<typeof signInDTO>;
};

export function SignInForm({ errors }: SignInFormProps) {
  return (
    <form hx-post="/api/auth/sign-in" hx-swap="outerHTML">
      <Input dto={signInDTO} name="username" label={$t('auth.username')} error={errors?.username} />
      <Input dto={signInDTO} name="password" label={$t('auth.password')} error={errors?.password} />

      <Button type="submit">{Html.escapeHtml($t('_submit'))}</Button>
    </form>
  );
}
