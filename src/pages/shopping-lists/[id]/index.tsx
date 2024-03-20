import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { ShoppingListEditSection } from '@shopping-lists/components/ShoppingListEditSection';
import { ShoppingList } from '@shopping-lists/models/shoppingList';
import { $t } from '@utils/$t';

import { productFormPage } from './productForm';

const shoppingListPage = new Elysia().use(context).get('', async ({ params: { id }, user }) => {
  const shoppingListDoc = await ShoppingList.findById(id).exec();

  if (!shoppingListDoc) {
    return (
      <Document user={user}>
        <span>{$t('_errors.notFound')}</span>
      </Document>
    );
  }

  if (!shoppingListDoc.author._id.equals(user!.id)) {
    return (
      <Document>
        <span>{$t('_errors.permissionDenied')}</span>
      </Document>
    );
  }

  return (
    <Document user={user}>
      <ShoppingListEditSection user={user!} shoppingListDoc={shoppingListDoc} />
    </Document>
  );
});

export const shoppingListPages = new Elysia().group('/:id', (app) =>
  app.use(shoppingListPage).use(productFormPage),
);
