import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { MealAddProductsSection } from '@meals/components/MealAddProductsSection';

import { mealContext } from './context';

export const addProductsPage = new Elysia().use(mealContext).get('/add-products', ({ user, mealDoc }) => {
  return (
    <Document user={user}>
      <MealAddProductsSection user={user} mealDoc={mealDoc} />
    </Document>
  );
});
