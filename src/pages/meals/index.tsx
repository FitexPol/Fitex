import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { MealsSection } from '@meals/components/MealsSection';

import { mealPages as singleMealPages } from './[id]';
import { newPage } from './new';
import { userContext } from '../context';

const mealsPage = new Elysia().use(userContext).get('', ({ request, user, query }) => (
  <Document currentUrl={request.url} user={user} isBackButtonVisible={false}>
    <MealsSection user={user} query={query} />
  </Document>
));

export const mealPages = new Elysia().group('/meals', (app) =>
  app.use(mealsPage).use(newPage).use(singleMealPages),
);
