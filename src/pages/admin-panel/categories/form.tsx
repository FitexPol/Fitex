import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { CategoryFormSection } from '@products/components/CategoryFormSection';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

export const categoryFormPage = new Elysia().use(context).get('/form', ({ user, query }) => {
  return (
    <Document user={user}>
      <CategoryFormSection categoryId={getQueryParamSecure(query.categoryId)} />
    </Document>
  );
});
