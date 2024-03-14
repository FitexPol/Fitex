import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { ShoppingListEditSection } from '@shopping-lists/components/ShoppingListEditSection';
import { ShoppingList } from '@shopping-lists/models/shoppingList';
import { $t } from '@utils/$t';

const _t = $t('shoppingLists');

export const shoppingListEditPage = new Elysia()
  .use(context)
  .get('/edit', async ({ user, params: { id } }) => {
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
        <Document>
          <span>{_t('_shared.errors.permissionDenied')}</span>
        </Document>
      );
    }

    return (
      <Document user={user}>
        <ShoppingListEditSection user={user!} shoppingListDoc={shoppingListDoc} />
      </Document>
    );
  });
