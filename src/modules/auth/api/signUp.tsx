import { type ValidationError, t } from 'elysia';

import type { App } from '@/app';

import SignUpForm, { type SignUpFormErrors } from '../components/SignUpForm';

export const signUp = (app: App) =>
  app.post(
    '/sign-up',
    async ({ body, jwt, setCookie, set }) => {
      if (body.password !== body.repeatedPassword) {
        set.status = 'Bad Request';

        return <SignUpForm errors={{ repeatedPassword: 'Hasła nie są takie same' }} />;
      }

      const token = await jwt.sign({ email: body.email });

      setCookie('token', token);

      set.redirect = '/';
    },
    {
      body: t.Object({
        username: t.String(),
        email: t.String(),
        password: t.String({
          minLength: 6,
          error: 'Hasło musi zawierać przynajmniej 6 znaków',
        }),
        repeatedPassword: t.String(),
      }),
      error({ code, error }) {
        if (code === 'VALIDATION') return getSignUpFormWithErrors(error);
      },
    },
  );

function getSignUpFormWithErrors({ all }: Readonly<ValidationError>): JSX.Element {
  const errors: SignUpFormErrors = {
    password: all.find(({ path }) => path === '/password')?.schema.error as string,
  };

  return <SignUpForm errors={errors} />;
}
