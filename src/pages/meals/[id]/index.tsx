import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { MealEditSection } from '@meals/components/MealEditSection';
import { Meal } from '@meals/models/meal';
import { $t } from '@utils/$t';

import { addToShoppingListFormPage } from './addToShoppingListForm';
import { productFormPage } from './productForm';

const mealPage = new Elysia().use(context).get('', async ({ params: { id }, user }) => {
  const mealDoc = await Meal.findById(id).exec();

  if (!mealDoc) {
    return (
      <Document user={user}>
        <span>{$t('_errors.notFound')}</span>
      </Document>
    );
  }

  if (!mealDoc.author._id.equals(user!.id)) {
    return (
      <Document user={user}>
        <span>{$t('_errors.permissionDenied')}</span>
      </Document>
    );
  }

  return (
    <Document user={user}>
      <MealEditSection user={user!} mealDoc={mealDoc} />
    </Document>
  );
});

export const mealPages = new Elysia().group('/:id', (app) =>
  app.use(mealPage).use(productFormPage).use(addToShoppingListFormPage),
);
