import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { MealSection } from '@meals/components/MealSection';
import { Meal } from '@meals/models/meal';
import { $t } from '@utils/$t';

import { mealEditPage } from './edit';
import { productFormPage } from './productForm';

const mealPage = new Elysia().use(context).get('', async ({ params: { id }, user }) => {
  const mealDoc = await Meal.findById(id).exec();

  if (!mealDoc) {
    return (
      <Document>
        <span>{$t('errors.notFound')}</span>
      </Document>
    );
  }

  if (!mealDoc.author._id.equals(user!.id)) {
    return (
      <Document>
        <span>{$t('permissionDenied')}</span>
      </Document>
    );
  }

  return (
    <Document user={user}>
      <MealSection mealDoc={mealDoc} />
    </Document>
  );
});

export const mealPages = new Elysia().group('/:id', (app) =>
  app.use(mealPage).use(mealEditPage).use(productFormPage),
);
