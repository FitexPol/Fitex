import Button from '@components/Button';
import Input from '@components/Input';
import type { ComponentProps, Form, FormErrors } from '@types';

export const signUpForm = {
  username: {
    type: 'text',
    name: 'username',
    placeholder: 'Username',
    validators: {
      minLength: 3,
      maxLength: 20,
      message: 'Username must be at least 3 characters long',
    },
  },
  email: {
    type: 'email',
    name: 'email',
    placeholder: 'E-mail',
    validators: {
      minLength: 3,
      regex:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'E-mail is invalid',
    },
  },
  password: {
    type: 'password',
    name: 'password',
    placeholder: 'Password',
    validators: {
      minLength: 6,
      maxLength: 20,
      message: 'Password must be at least 6 characters long',
    },
  },
  repeatedPassword: {
    type: 'password',
    name: 'repeatedPassword',
    placeholder: 'Repeat password',
  },
} satisfies Form;

export type SignUpFormErrors = FormErrors<typeof signUpForm>;

type SignUpFormProps = {
  errors?: SignUpFormErrors;
};

export default function SignUpForm({ errors }: ComponentProps<SignUpFormProps>) {
  return (
    <form hx-boost="true" action="/api/sign-up" method="post" hx-target-4xx="this">
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
