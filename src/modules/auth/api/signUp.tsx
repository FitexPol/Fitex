import type { ValidationError } from 'elysia';

import type { App } from '@/app';
import getBodySchema from '@utils/getBodySchema';
import getBodySchemaErrors from '@utils/getBodySchemaErrors';

import SignUpForm from '../components/SignUpForm';
import { type SignUpFormErrors, type SignUpForm as SignUpFormType, signUpForm } from '../forms';

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
      body: getBodySchema<SignUpFormType>(signUpForm),
      error({ code, error }) {
        if (code === 'VALIDATION') return getSignUpFormWithErrors(error);
      },
    },
  );

function getSignUpFormWithErrors(error: Readonly<ValidationError>): JSX.Element {
  const errors: SignUpFormErrors = getBodySchemaErrors<SignUpFormType>(error, signUpForm);

  return <SignUpForm errors={errors} />;
}
