import { Elysia, type ValidationError } from 'elysia';

import { context } from '@/context';
import { getBodySchema } from '@utils/getBodySchema';
import { getBodySchemaErrors } from '@utils/getBodySchemaErrors';

import { SignUpForm } from '../components/SignUpForm';
import { type SignUpFormErrors, type SignUpForm as SignUpFormType, signUpForm } from '../forms';
import { User } from '../models/user';

export const signUp = new Elysia().use(context).post(
  '/sign-up',
  async ({ body, jwt, set, cookie: { auth } }) => {
    if (body.password !== body.repeatedPassword) {
      set.status = 'Bad Request';

      return <SignUpForm errors={{ repeatedPassword: 'Provided passwords are not the same' }} />;
    }

    const existingUser = await User.exists({ username: body.username });

    if (existingUser) {
      set.status = 'Bad Request';

      return <SignUpForm errors={{ username: 'Username is already taken' }} />;
    }

    const hash = await Bun.password.hash(body.password);

    const user = new User({
      username: body.username,
      password: hash,
    });

    const userDoc = await user.save();

    const token = await jwt.sign({
      id: userDoc.id,
      username: body.username,
    });

    auth.set({
      value: token,
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
);

function getSignUpFormWithErrors(error: Readonly<ValidationError>): JSX.Element {
  const errors: SignUpFormErrors = getBodySchemaErrors<SignUpFormType>(error, signUpForm);

  return <SignUpForm errors={errors} />;
}
