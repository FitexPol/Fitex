import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { MealEditSection } from '@meals/components/MealEditSection';

import { addProductsPage } from './addProducts';
import { mealContext } from './context';
import { descriptionFormPage } from './descriptionForm';
import { productFormPage } from './productForm';

const mealPage = new Elysia().use(mealContext).get('', ({ mealDoc, user }) => {
  return (
    <Document user={user}>
      <MealEditSection mealDoc={mealDoc} />
    </Document>
  );
});

export const mealPages = new Elysia().group('/:id', (app) =>
  app.use(mealPage).use(descriptionFormPage).use(addProductsPage).use(productFormPage),
);
