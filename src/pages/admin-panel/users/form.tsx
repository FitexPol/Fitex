import { Elysia } from 'elysia';

import { context } from '@/context';
import { UserFormSection } from '@auth/components/UserFormSection';
import { Document } from '@components/_Document';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

export const userFormPage = new Elysia().use(context).get('/form', ({ user, query }) => {
  return (
    <Document user={user}>
      <UserFormSection userId={getQueryParamSecure(query.userId)} />
    </Document>
  );
});
