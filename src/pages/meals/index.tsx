import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { MealsSection } from '@meals/components/MealsSection';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

import { mealPage } from './[id]';
import { mealFormPage } from './form';

const mealsPage = new Elysia().use(context).get('', async ({ user, query }) => {
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

export const mealPages = new Elysia().group('/meals', (app) =>
  app.use(mealsPage).use(mealPage).use(mealFormPage),
);
