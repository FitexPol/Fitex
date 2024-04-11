import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { MealBreadcrumbs } from '@meals/components/MealBreadcrumbs';
import { MealsSection } from '@meals/components/MealsSection';
import { listPageQuery } from '@vars';

import { mealPages as singleMealPages } from './[id]';
import { newPage } from './new';
import { userContext } from '../context';

const mealsPage = new Elysia().use(userContext).get(
  '',
  ({ request, user, query }) => (
    <Document currentUrl={request.url} user={user} isBackButtonVisible={false}>
      <MealBreadcrumbs />
      <MealsSection user={user} query={query} />
    </Document>
  ),
  {
    query: listPageQuery,
  },
);

export const mealPages = new Elysia().group('/meals', (app) =>
  app.use(mealsPage).use(newPage).use(singleMealPages),
);
