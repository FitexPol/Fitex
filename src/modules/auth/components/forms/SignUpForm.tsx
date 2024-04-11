import { Button } from '@components/Button';
import { StringInput } from '@components/inputs/StringInput';
import { type FormErrors } from '@types';
import { $t } from '@utils/$t';

import { signUpDTO } from '../../dto/signUp';

type SignUpFormProps = {
  errors?: FormErrors<typeof signUpDTO>;
};

export function SignUpForm({ errors }: SignUpFormProps) {
  return (
    <form hx-post="/api/auth/sign-up" hx-swap="outerHTML">
      <StringInput dto={signUpDTO} name="username" label={$t('auth.username')} error={errors?.username} />

      <StringInput
        dto={signUpDTO}
        name="password"
        type="password"
        label={$t('auth.password')}
        error={errors?.password}
      />

      <StringInput
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
