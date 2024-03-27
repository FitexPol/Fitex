import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { Breadcrumbs } from '@components/Breadcrumbs';
import { MealEditSection } from '@meals/components/MealEditSection';
import { getBreadcrumbs } from '@meals/utils/getBreadcrumbs';

import { mealContext } from './context';
import { descriptionPage } from './description';
import { namePage } from './name';
import { productPage } from './product';
import { productsPage } from './products';

const mealPage = new Elysia().use(mealContext).get('', ({ request, mealDoc, user }) => (
  <Document currentUrl={request.url} user={user}>
    <>
      <Breadcrumbs items={getBreadcrumbs([{ href: `/${mealDoc.id}`, label: mealDoc.name }])} />
      <MealEditSection mealDoc={mealDoc} />
    </>
  </Document>
));

export const mealPages = new Elysia().group('/:id', (app) =>
  app.use(mealPage).use(namePage).use(descriptionPage).use(productsPage).use(productPage),
);
