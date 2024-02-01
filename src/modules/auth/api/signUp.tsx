import { Elysia, type ValidationError } from 'elysia';

import { setup } from '@/setup';
import { getBodySchema } from '@utils/getBodySchema';
import { getBodySchemaErrors } from '@utils/getBodySchemaErrors';

import { SignUpForm } from '../components/SignUpForm';
import { type SignUpFormErrors, type SignUpForm as SignUpFormType, signUpForm } from '../forms';

export const signUp = new Elysia().use(setup).group('/sign-up', (app) =>
  app.post(
    '',
    async ({ body, jwt, set, cookie: { auth } }) => {
      if (body.password !== body.repeatedPassword) {
        set.status = 'Bad Request';

        return <SignUpForm errors={{ repeatedPassword: 'Provided passwords are not the same' }} />;
      }

      auth.set({
        value: await jwt.sign({ email: body.email }),
        path: '/',
        httpOnly: true,
        secure: true,
        maxAge: 7 * 86400,
      });

      set.status = 201;
      set.headers = { 'Hx-Location': '/' };
    },
    {
      body: getBodySchema<SignUpFormType>(signUpForm),
      error({ code, error }) {
        if (code === 'VALIDATION') return getSignUpFormWithErrors(error);
      },
    },
  ),
);

function getSignUpFormWithErrors(error: Readonly<ValidationError>): JSX.Element {
  const errors: SignUpFormErrors = getBodySchemaErrors<SignUpFormType>(error, signUpForm);

  return <SignUpForm errors={errors} />;
}
