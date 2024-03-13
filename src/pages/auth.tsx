import { Elysia } from 'elysia';

import { context } from '@/context';
import { AuthSection } from '@auth/components/AuthSection';
import { Document } from '@components/_Document';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

export const authPage = new Elysia().use(context).guard(
  {
    beforeHandle: ({ user, set }) => {
      if (user) {
        set.redirect = '/shopping-lists';

        return 'User already logged in';
      }
    },
  },
  (app) =>
    app.get('/auth', ({ query }) => {
      return (
        <Document layout="none">
          <AuthSection typeQuery={getQueryParamSecure(query.type)} />
        </Document>
      );
    }),
);
