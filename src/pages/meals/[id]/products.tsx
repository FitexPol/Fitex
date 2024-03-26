import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { MealAddProductsSection } from '@meals/components/MealAddProductsSection';

import { mealContext } from './context';

export const productsPage = new Elysia().use(mealContext).get('/products', ({ request, user, mealDoc }) => (
  <Document currentUrl={request.url} user={user}>
    <MealAddProductsSection user={user} mealDoc={mealDoc} />
  </Document>
));
