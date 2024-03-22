import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { FormSection } from '@components/sections/FormSection';
import { AddToShoppingListForm } from '@meals/components/forms/AddToShoppingListForm';
import { $t } from '@utils/$t';

import { mealContext } from './context';

export const addToShoppingListFormPage = new Elysia()
  .use(mealContext)
  .get('/add-to-shopping-list-form', async ({ mealDoc, user }) => {
    return (
      <Document user={user}>
        <FormSection title={$t('meals.addToShoppingList')} floatingLinkHref="/meals">
          <AddToShoppingListForm user={user} mealDoc={mealDoc} />
        </FormSection>
      </Document>
    );
  });
