import { Elysia } from 'elysia';

import { context } from '@/context';
import { InlineError, type InlineErrorDetails } from '@errors/InlineError';
import { $t } from '@utils/$t';
import { getBodySchemaErrors } from '@utils/api/getBodySchemaErrors';
import { HxResponseHeader } from '@vars';

import { SignInForm } from '../components/forms/SignInForm';
import { signInDTO } from '../dto/signIn';
import { User } from '../models/user';
import { setAuthCookie } from '../utils/setAuthCookie';

export const signIn = new Elysia().use(context).post(
  '/sign-in',
  async ({ body, jwt, set, cookie: { auth } }) => {
    const userDoc = await User.findOne({ username: body.username }).exec();

    if (!userDoc)
      throw new InlineError<typeof signInDTO>({
        status: 404,
        message: $t('auth.signIn.errors.notFound'),
        field: 'username',
      });

    const isPasswordCorrect = await Bun.password.verify(body.password, userDoc.password);

    if (!isPasswordCorrect)
      throw new InlineError<typeof signInDTO>({
        status: 400,
        message: $t('auth.signIn.errors.wrongPassword'),
        field: 'password',
      });

    const token = await jwt.sign({
      id: userDoc.id,
      username: userDoc.username,
    });

    setAuthCookie(auth, token);

    set.status = 200;
    set.headers[HxResponseHeader.Location] = '/shopping-lists';
  },
  {
    body: signInDTO,
    error({ code, error, set }) {
      switch (code) {
        case 'VALIDATION':
          return <SignInForm errors={getBodySchemaErrors(error, signInDTO)} />;
        case 'InlineError': {
          const { status, message, field }: InlineErrorDetails<typeof signInDTO> = JSON.parse(error.message);

          console.log(message);

          set.status = status;
          set.headers[HxResponseHeader.Retarget] = 'this';

          return <SignInForm errors={{ [field]: message }} />;
        }
      }
    },
  },
);
