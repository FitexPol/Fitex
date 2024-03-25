import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { MealsSection } from '@meals/components/MealsSection';

import { mealPages as singleMealPages } from './[id]';
import { nameFormPage } from './nameForm';
import { userContext } from '../context';

const mealsPage = new Elysia().use(userContext).get('', async ({ user, query }) => {
  return (
    <Document user={user}>
      <MealsSection user={user} query={query} />
    </Document>
  );
});

export const mealPages = new Elysia().group('/meals', (app) =>
  app.use(mealsPage).use(nameFormPage).use(singleMealPages),
);
