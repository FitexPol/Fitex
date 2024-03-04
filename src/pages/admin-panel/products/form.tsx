import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { ProductFormSection } from '@products/components/ProductFormSection';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

export const productFormPage = new Elysia().use(context).get('/form', ({ user, query }) => {
  return (
    <Document user={user}>
      <ProductFormSection productId={getQueryParamSecure(query.productId)} />
    </Document>
  );
});
