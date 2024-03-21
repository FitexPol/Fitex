import { Elysia } from 'elysia';

import { context } from '@/context';
import { $t } from '@utils/$t';
import { NotificationError } from '@utils/errors/NotificationError';

import { ShoppingListCardProducts } from '../../components/ShoppingListCardProducts';
import { shoppingListContext } from '../context';

export const toggleCheckState = new Elysia()
  .use(context)
  .use(shoppingListContext)
  .patch('check-state', async ({ shoppingListDoc, params: { productId } }) => {
    const productDoc = shoppingListDoc.products.find((productDoc) => productDoc._id.equals(productId));

    if (!productDoc) throw new NotificationError({ status: 404, message: $t('_errors.notFound') });

    productDoc.isChecked = !productDoc.isChecked;

    try {
      await shoppingListDoc.save();
    } catch {
      throw new NotificationError({ status: 500, message: $t('_errors.mongoError') });
    }

    return <ShoppingListCardProducts shoppingListDoc={shoppingListDoc} />;
  });
