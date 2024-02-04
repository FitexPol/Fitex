import { Elysia } from 'elysia';

import { context } from '@/context';
import { AuthSection } from '@auth/components/AuthSection';
import { Document } from '@components/_Document';

export const authPage = new Elysia().use(context).get('/auth', ({ query }) => {
  return (
    <Document layout="none">
      <AuthSection typeQuery={query.type ?? ''} />
    </Document>
  );
});
