import Input from '@components/Input';
import type { ComponentProps } from '@types';

export type SignUpFormErrors = {
  password?: string;
  repeatedPassword?: string;
};

type SignUpFormProps = {
  errors?: SignUpFormErrors;
};

export default function SignUpForm({ errors }: ComponentProps<SignUpFormProps>) {
  return (
    <form hx-boost="true" action="/api/sign-up" method="post" hx-target-4xx="this">
      <Input type="text" name="username" placeholder="Username" value="Test" />
      <Input type="email" name="email" placeholder="E-mail" value="test@test.pl" />

      <Input type="password" name="password" placeholder="Password" error={errors?.password} />

      <Input
        type="password"
        name="repeatedPassword"
        placeholder="Repeat password"
        error={errors?.repeatedPassword}
      />

      <Input type="submit" value="Sign up" class="contrast" />
    </form>
  );
}
