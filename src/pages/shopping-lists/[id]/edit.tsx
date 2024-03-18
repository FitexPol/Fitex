import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { ShoppingListEditSection } from '@shopping-lists/components/ShoppingListEditSection';
import { ShoppingList } from '@shopping-lists/models/shoppingList';
import { $t } from '@utils/$t';

export const shoppingListEditPage = new Elysia()
  .use(context)
  .get('/edit', async ({ user, params: { id } }) => {
    const shoppingListDoc = await ShoppingList.findById(id).populate('meals.meal').exec();

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
