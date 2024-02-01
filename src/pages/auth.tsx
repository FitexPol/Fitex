import { Elysia } from 'elysia';

import { setup } from '@/setup';
import { AuthSection } from '@auth/components/AuthSection';
import { Document } from '@components/_Document';

export const authPage = new Elysia().use(setup).get(
  '/auth',
  ({ query }) => {
    return (
      <Document layout="none">
        <AuthSection typeQuery={query.type ?? ''} />
      </Document>
    );
  },
  {
    beforeHandle: ({ user, set }) => {
      if (user) {
        set.redirect = '/';

        return 'Unauthorized';
      }
    },
  },
);
