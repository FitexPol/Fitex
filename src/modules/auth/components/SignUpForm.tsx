import Button from '@components/Button';
import Input from '@components/Input';
import type { ComponentProps } from '@types';

import { type SignUpFormErrors, signUpForm } from '../forms';

type SignUpFormProps = {
  errors?: SignUpFormErrors;
};

export default function SignUpForm({ errors }: ComponentProps<SignUpFormProps>) {
  return (
    <form hx-post="/api/sign-up" hx-target-4xx="this">
      <Input control={signUpForm.username} error={errors?.username} />
      <Input control={signUpForm.email} error={errors?.email} />
      <Input control={signUpForm.password} error={errors?.password} />
      <Input control={signUpForm.repeatedPassword} error={errors?.repeatedPassword} />

      <Button type="submit" class="contrast">
        Sign up
      </Button>
    </form>
  );
}
