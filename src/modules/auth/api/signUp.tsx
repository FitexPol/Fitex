import { Elysia } from 'elysia';

import { context } from '@/context';
import { $t } from '@utils/$t';
import { getBodySchema } from '@utils/api/getBodySchema';
import { getBodySchemaErrors } from '@utils/api/getBodySchemaErrors';
import { InlineError, type InlineErrorDetails } from '@utils/errors/InlineError';
import { NotificationError } from '@utils/errors/NotificationError';
import { HxResponseHeader } from '@vars';

import { SignUpForm } from '../components/forms/SignUpForm';
import { type SignUpForm as SignUpFormType, signUpForm } from '../forms/signUp';
import { User } from '../models/user';
import { setAuthCookie } from '../utils/setAuthCookie';

export const signUp = new Elysia().use(context).post(
  '/sign-up',
  async ({ body, jwt, set, cookie: { auth } }) => {
    if (body.password !== body.repeatedPassword)
      throw new InlineError<SignUpFormType>({
        status: 400,
        message: $t('auth.signUp.errors.wrongRepeatedPassword'),
        field: 'repeatedPassword',
      });

    const existingUser = await User.exists({ username: body.username });

    if (existingUser)
      throw new InlineError<SignUpFormType>({
        status: 400,
        message: $t('auth.signUp.errors.userExists'),
        field: 'username',
      });

    const hash = await Bun.password.hash(body.password);

    const userDoc = new User({
      username: body.username,
      password: hash,
    });

    try {
      await userDoc.save();
    } catch {
      throw new NotificationError({ status: 500, message: $t('_errors.mongoError') });
    }

    const token = await jwt.sign({
      id: userDoc.id,
      username: body.username,
    });

    setAuthCookie(auth, token);

    set.status = 'Created';
    set.headers[HxResponseHeader.Location] = '/';
  },
  {
    body: getBodySchema<SignUpFormType>(signUpForm),
    error({ code, error, set }) {
      switch (code) {
        case 'VALIDATION':
          return <SignUpForm errors={getBodySchemaErrors<SignUpFormType>(error, signUpForm)} />;
        case 'InlineError': {
          const { status, message, field }: InlineErrorDetails<SignUpFormType> = JSON.parse(error.message);

          set.status = status;
          return <SignUpForm errors={{ [field]: message }} />;
        }
      }
    },
  },
);
