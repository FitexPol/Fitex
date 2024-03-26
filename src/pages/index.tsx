import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { HxResponseHeader } from '@vars';

import { authPage } from './auth';
import { mealPages } from './meals';
import { shoppingListPages } from './shopping-lists';

export const pages = new Elysia()
  .use(context)
  .onError(({ request, code, set, user, error }) => {
    set.headers['Content-Type'] = 'text/html';
    set.headers[HxResponseHeader.Retarget] = 'body';

    const ErrorPage = ({ children }: ComponentProps) => {
      return (
        <Document currentUrl={request.url} user={user} layout={user ? 'default' : 'none'}>
          <span>{children}</span>
        </Document>
      );
    };

    switch (code) {
      case 'PageNotFoundError': {
        set.status = 404;
        return <ErrorPage>{$t('_errors.notFound')}</ErrorPage>;
      }
      case 'PageNotPermittedError': {
        set.status = 403;
        return <ErrorPage>{$t('_errors.permissionDenied')}</ErrorPage>;
      }
      default: {
        set.status = 500;
        return <ErrorPage>{error.message}</ErrorPage>;
      }
    }
  })
  .use(authPage)
  .guard(
    {
      beforeHandle: ({ user, set }) => {
        if (!user) {
          set.redirect = '/auth';

          return 'Unauthenticated';
        }
      },
    },
    (app) =>
      app
        .use(shoppingListPages)
        .use(mealPages)
        .get('/', ({ set }) => {
          set.redirect = '/shopping-lists';
        }),
  );
