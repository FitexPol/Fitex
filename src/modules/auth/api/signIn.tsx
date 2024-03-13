import { Elysia, type ValidationError } from 'elysia';

import { context } from '@/context';
import { $t } from '@utils/$t';
import { getBodySchema } from '@utils/getBodySchema';
import { getBodySchemaErrors } from '@utils/getBodySchemaErrors';
import { HxResponseHeader } from '@vars';

import { SignIn } from '../components/forms/SignIn';
import { type SignInForm, type SignInFormErrors, signInForm } from '../forms/signIn';
import { User } from '../models/user';

const _t = $t('auth');

export const signIn = new Elysia().use(context).post(
  '/sign-in',
  async ({ body, jwt, set, cookie: { auth } }) => {
    const userDoc = await User.findOne({ username: body.username }).exec();

    if (!userDoc) {
      set.status = 'Not Found';

      return <SignIn errors={{ username: _t('_shared.errors.notFound') }} />;
    }

    const isPasswordCorrect = await Bun.password.verify(body.password, userDoc.password);

    if (!isPasswordCorrect) {
      set.status = 'Bad Request';

      return <SignIn errors={{ password: _t('signIn.errors.wrongPassword') }} />;
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
    set.headers[HxResponseHeader.Location] = '/';
  },
  {
    body: getBodySchema<SignInForm>(signInForm),
    error({ code, error }) {
      if (code === 'VALIDATION') return getSignInFormWithErrors(error);
    },
  },
);

function getSignInFormWithErrors(error: Readonly<ValidationError>): JSX.Element {
  const errors: SignInFormErrors = getBodySchemaErrors<SignInForm>(error, signInForm);

  return <SignIn errors={errors} />;
}
