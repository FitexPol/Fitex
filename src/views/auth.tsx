import type { App } from '@/app';
import AuthSection from '@auth/components/AuthSection';
import Document from '@components/_Document';

export const auth = (app: App) =>
  app.get(
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
        }
      },
    },
  );
