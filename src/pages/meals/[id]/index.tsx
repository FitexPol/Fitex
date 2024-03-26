import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { MealEditSection } from '@meals/components/MealEditSection';

import { mealContext } from './context';
import { descriptionPage } from './description';
import { productPage } from './product';
import { productsPage } from './products';

const mealPage = new Elysia().use(mealContext).get('', ({ request, mealDoc, user }) => (
  <Document currentUrl={request.url} user={user}>
    <MealEditSection mealDoc={mealDoc} />
  </Document>
));

export const mealPages = new Elysia().group('/:id', (app) =>
  app.use(mealPage).use(descriptionPage).use(productsPage).use(productPage),
);
