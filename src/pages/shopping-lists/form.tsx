import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { MealFormSection } from '@meals/components/MealFormSection';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

export const shoppingListFormPage = new Elysia().use(context).get('/form', async ({ user, query }) => {
  return (
    <Document user={user}>
      MealFormSection
      {/* <MealFormSection user={user!} mealId={getQueryParamSecure(query.mealId)} /> */}
    </Document>
  );
});
