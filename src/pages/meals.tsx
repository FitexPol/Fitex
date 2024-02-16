import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { MealsSection } from '@meals/components/MealsSection';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

export const mealsPage = new Elysia().use(context).get('/meals', async ({ user, query }) => {
  return (
    <Document user={user}>
      <MealsSection
        user={user!}
        sortQuery={getQueryParamSecure(query.sort)}
        itemsPerPageQuery={getQueryParamSecure(query.itemsPerPage)}
        pageQuery={getQueryParamSecure(query.page)}
      />
    </Document>
  );
});
