import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { MealEditSection } from '@meals/components/MealEditSection';

import { addToShoppingListFormPage } from './addToShoppingListForm';
import { mealContext } from './context';
import { productFormPage } from './productForm';

const mealPage = new Elysia().use(mealContext).get('', async ({ mealDoc, user }) => {
  return (
    <Document user={user}>
      <MealEditSection user={user} mealDoc={mealDoc} />
    </Document>
  );
});

export const mealPages = new Elysia().group('/:id', (app) =>
  app.use(mealPage).use(productFormPage).use(addToShoppingListFormPage),
);
