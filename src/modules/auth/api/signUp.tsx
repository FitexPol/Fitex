import type { ValidationError } from 'elysia';

import type { App } from '@/app';
import getBodySchema from '@utils/getBodySchema';
import getBodySchemaErrors from '@utils/getBodySchemaErrors';

import SignUpForm, { type SignUpFormErrors, signUpForm } from '../components/SignUpForm';

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
      body: getBodySchema<typeof signUpForm>(signUpForm),
      error({ code, error }) {
        if (code === 'VALIDATION') return getSignUpFormWithErrors(error);
      },
    },
  );

function getSignUpFormWithErrors(error: Readonly<ValidationError>): JSX.Element {
  const errors: SignUpFormErrors = getBodySchemaErrors<typeof signUpForm>(error, signUpForm);

  return <SignUpForm errors={errors} />;
}
