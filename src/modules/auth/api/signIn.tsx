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
    const userDoc = await User.findOne({ username: body.username }).exec();

    if (!userDoc) {
      set.status = 'Bad Request';

      return <SignInForm errors={{ username: 'User with provided username does not exist' }} />;
    }

    const isPasswordCorrect = await Bun.password.verify(body.password, userDoc.password);

    if (!isPasswordCorrect) {
      set.status = 'Bad Request';

      return <SignInForm errors={{ password: 'Provided password is incorrect' }} />;
    }

    const token = await jwt.sign({
      id: userDoc.id,
      username: userDoc.username,
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
