import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { FormSection } from '@components/sections/FormSection';
import { AddToShoppingListForm } from '@meals/components/forms/AddToShoppingListForm';
import { Meal } from '@meals/models/meal';
import { $t } from '@utils/$t';

export const addToShoppingListFormPage = new Elysia()
  .use(context)
  .get('/add-to-shopping-list-form', async ({ params: { id }, user }) => {
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
        <FormSection title={$t('meals.addToShoppingList')} floatingLinkHref="/meals">
          <AddToShoppingListForm user={user!} mealDoc={mealDoc} />
        </FormSection>
      </Document>
    );
  });
