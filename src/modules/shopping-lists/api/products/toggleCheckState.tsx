import { Elysia } from 'elysia';

import { ProductList } from '@components/ProductList';
import { NotificationError } from '@errors/NotificationError';

import { shoppingListContext } from '../context';

export const toggleCheckState = new Elysia()
  .use(shoppingListContext)
  .patch('/check-state', async ({ shoppingListDoc, params: { productId } }) => {
    const productDoc = shoppingListDoc.products.find((productDoc) => productDoc._id.equals(productId));

    if (!productDoc) throw new NotificationError('Not Found');

    productDoc.isChecked = !productDoc.isChecked;

    try {
      await shoppingListDoc.save();
    } catch {
      throw new NotificationError('Mongo Error');
    }

    return <ProductList basePath="shopping-lists" entity={shoppingListDoc} />;
  });
