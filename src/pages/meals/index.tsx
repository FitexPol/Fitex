import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { MealsSection } from '@meals/components/MealsSection';

import { mealPages as singleMealPages } from './[id]';
import { basicInformationFormPage } from './basicInformationForm';

const mealsPage = new Elysia().use(context).get('', async ({ user, query }) => {
  return (
    <Document user={user}>
      <MealsSection user={user!} query={query} />
    </Document>
  );
});

export const mealPages = new Elysia().group('/meals', (app) =>
  app.use(mealsPage).use(basicInformationFormPage).use(singleMealPages),
);
