import { Elysia } from 'elysia';

import { ProductList } from '@components/ProductList';
import { NotificationError } from '@errors/NotificationError';

import { mealContext } from '../context';

export const toggleCheckState = new Elysia()
  .use(mealContext)
  .patch('/check-state', async ({ mealDoc, params: { productId } }) => {
    const productDoc = mealDoc.products.find((productDoc) => productDoc._id.equals(productId));

    if (!productDoc) throw new NotificationError('Not Found');

    productDoc.isChecked = !productDoc.isChecked;

    try {
      await mealDoc.save();
    } catch {
      throw new NotificationError('Mongo Error');
    }

    return <ProductList basePath="meals" entity={mealDoc} />;
  });
