import { Elysia } from 'elysia';
import { Types } from 'mongoose';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { FormSection } from '@components/sections/FormSection';
import { UpdateMealForm } from '@shopping-lists/components/forms/UpdateMealForm';
import { ShoppingList } from '@shopping-lists/models/shoppingList';
import { $t } from '@utils/$t';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

const _t = $t('shoppingLists');
const _tShared = $t('_shared');

export const mealFormPage = new Elysia()
  .use(context)
  .get('/meal-form', async ({ params: { id }, user, query }) => {
    const shoppingListDoc = await ShoppingList.findById(id).populate('meals.meal').exec();

    if (!shoppingListDoc) {
      return (
        <Document user={user}>
          <span>{_t('_shared.errors.notFound')}</span>
        </Document>
      );
    }

    if (!shoppingListDoc.author._id.equals(user!.id)) {
      return (
        <Document user={user}>
          <span>{_t('_shared.errors.permissionDenied')}</span>
        </Document>
      );
    }

    const shoppingListMeal = shoppingListDoc.meals.find(({ meal }) => {
      if (!meal || meal instanceof Types.ObjectId) return false;

      return meal._id.equals(getQueryParamSecure(query.mealId));
    });

    return (
      <Document user={user}>
        <FormSection title={shoppingListDoc.name}>
          {shoppingListMeal ? (
            !shoppingListMeal.meal || shoppingListMeal.meal instanceof Types.ObjectId ? (
              <span>{_tShared('_shared.errors.population')}</span>
            ) : (
              <UpdateMealForm
                shoppingListId={shoppingListDoc.id}
                mealDoc={shoppingListMeal.meal}
                quantity={shoppingListMeal.quantity}
              />
            )
          ) : (
            <span>{_t('_shared.errors.notFound')}</span>
          )}
        </FormSection>
      </Document>
    );
  });
