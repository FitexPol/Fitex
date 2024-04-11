import { Button } from '@components/Button';
import { StringInput } from '@components/inputs/StringInput';
import { type FormErrors } from '@types';
import { $t } from '@utils/$t';

import { signInDTO } from '../../dto/signIn';

type SignInFormProps = {
  errors?: FormErrors<typeof signInDTO>;
};

export function SignInForm({ errors }: SignInFormProps) {
  return (
    <form hx-post="/api/auth/sign-in" hx-swap="outerHTML">
      <StringInput dto={signInDTO} name="username" label={$t('auth.username')} error={errors?.username} />

      <StringInput
        dto={signInDTO}
        name="password"
        type="password"
        label={$t('auth.password')}
        error={errors?.password}
      />

      <Button type="submit">{Html.escapeHtml($t('_submit'))}</Button>
    </form>
  );
}
