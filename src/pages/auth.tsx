import { Elysia } from 'elysia';

import { context } from '@/context';
import { AuthSection } from '@auth/components/AuthSection';
import { Document } from '@components/_Document';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

export const authPage = new Elysia().use(context).get('/auth', ({ query }) => {
  return (
    <Document user={null} layout="none">
      <AuthSection typeQuery={getQueryParamSecure(query.type)} />
    </Document>
  );
});
