import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { ShoppingListsSection } from '@meals/components/ShoppingListsSection';
import { Meal } from '@meals/models/meal';
import { $t } from '@utils/$t';

export const shoppingListsPage = new Elysia()
  .use(context)
  .get('/shopping-lists', async ({ params: { id }, user, query }) => {
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
        <ShoppingListsSection user={user!} mealId={mealDoc.id} query={query} />
      </Document>
    );
  });
