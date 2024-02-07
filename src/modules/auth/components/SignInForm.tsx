import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { type ComponentProps } from '@types';

import { type SignInFormErrors, signInForm } from '../forms';

type SignInFormProps = {
  errors?: SignInFormErrors;
};

export function SignInForm({ errors }: ComponentProps<SignInFormProps>) {
  return (
    <form hx-post="/api/auth/sign-in" hx-swap="outerHTML" hx-target-4xx="this">
      <Input control={signInForm.username} error={errors?.username} />
      <Input control={signInForm.password} error={errors?.password} />

      <Button type="submit" class="contrast">
        Sign in
      </Button>
    </form>
  );
}
