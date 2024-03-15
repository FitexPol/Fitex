import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { ShoppingListSection } from '@shopping-lists/components/ShoppingListSection';
import { ShoppingList } from '@shopping-lists/models/shoppingList';
import { $t } from '@utils/$t';

import { shoppingListEditPage } from './edit';
import { mealFormPage } from './mealForm';
import { productFormPage } from './productForm';

const shoppingListPage = new Elysia().use(context).get('', async ({ params: { id }, user }) => {
  const shoppingListDoc = await ShoppingList.findById(id).populate('meals.meal').exec();

  if (!shoppingListDoc) {
    return (
      <Document>
        <span>{$t('errors.notFound')}</span>
      </Document>
    );
  }

  if (!shoppingListDoc.author._id.equals(user!.id)) {
    return (
      <Document>
        <span>{$t('errors.permissionDenied')}</span>
      </Document>
    );
  }

  return (
    <Document user={user}>
      <ShoppingListSection shoppingListDoc={shoppingListDoc} />
    </Document>
  );
});

export const shoppingListPages = new Elysia().group('/:id', (app) =>
  app.use(shoppingListPage).use(shoppingListEditPage).use(productFormPage).use(mealFormPage),
);
