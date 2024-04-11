import { Elysia } from 'elysia';

import { context } from '@/context';
import { InlineError, type InlineErrorDetails } from '@errors/InlineError';
import { NotificationError } from '@errors/NotificationError';
import { $t } from '@utils/$t';
import { getBodySchemaErrors } from '@utils/api/getBodySchemaErrors';
import { HxResponseHeader } from '@vars';

import { SignUpForm } from '../components/forms/SignUpForm';
import { signUpDTO } from '../dto/signUp';
import { User } from '../models/user';
import { setAuthCookie } from '../utils/setAuthCookie';

export const signUp = new Elysia().use(context).post(
  '/sign-up',
  async ({ body, jwt, set, cookie: { auth } }) => {
    if (body.password !== body.repeatedPassword)
      throw new InlineError<typeof signUpDTO>({
        status: 400,
        message: $t('auth.signUp.errors.wrongRepeatedPassword'),
        field: 'repeatedPassword',
      });

    const existingUser = await User.exists({ username: body.username });

    if (existingUser)
      throw new InlineError<typeof signUpDTO>({
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
      throw new NotificationError('Mongo Error');
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
    body: signUpDTO,
    error({ code, error, set }) {
      switch (code) {
        case 'VALIDATION':
          return <SignUpForm errors={getBodySchemaErrors(error, signUpDTO)} />;
        case 'InlineError': {
          const { status, message, field }: InlineErrorDetails<typeof signUpDTO> = JSON.parse(error.message);

          set.status = status;
          set.headers[HxResponseHeader.Retarget] = 'this';

          return <SignUpForm errors={{ [field]: message }} />;
        }
      }
    },
  },
);
