import { Elysia, type ValidationError } from 'elysia';

import { context } from '@/context';
import { getBodySchema } from '@utils/getBodySchema';
import { getBodySchemaErrors } from '@utils/getBodySchemaErrors';

import { SignInForm } from '../components/SignInForm';
import { type SignInFormErrors, type SignInForm as SignInFormType, signInForm } from '../forms';
import { User } from '../models/user';

export const signIn = new Elysia().use(context).post(
  '/sign-in',
  async ({ body, jwt, set, cookie: { auth } }) => {
    const user = await User.findOne({ email: body.email });

    if (!user) {
      set.status = 'Bad Request';

      return <SignInForm errors={{ email: 'User with provided email does not exist' }} />;
    }

    if (user.username !== body.username) {
      set.status = 'Bad Request';

      return <SignInForm errors={{ username: 'Provided username is incorrect' }} />;
    }

    const isPasswordCorrect = await Bun.password.verify(body.password, user.password);

    if (!isPasswordCorrect) {
      set.status = 'Bad Request';

      return <SignInForm errors={{ password: 'Provided password is incorrect' }} />;
    }

    const token = await jwt.sign({
      username: user.username,
      email: user.email,
    });

    auth.set({
      value: token,
      path: '/',
      httpOnly: true,
      secure: true,
      maxAge: 7 * 86400,
    });

    set.status = 200;
    set.headers = { 'Hx-Location': '/' };
  },
  {
    body: getBodySchema<SignInFormType>(signInForm),
    error({ code, error }) {
      if (code === 'VALIDATION') return getSignInFormWithErrors(error);
    },
  },
);

function getSignInFormWithErrors(error: Readonly<ValidationError>): JSX.Element {
  const errors: SignInFormErrors = getBodySchemaErrors<SignInFormType>(error, signInForm);

  return <SignInForm errors={errors} />;
}
