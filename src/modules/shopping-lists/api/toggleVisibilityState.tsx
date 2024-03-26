import { Elysia } from 'elysia';

import { NotificationError } from '@errors/NotificationError';

import { shoppingListContext } from './context';
import { ShoppingListCard } from '../components/ShoppingListCard';

export const toggleVisibilityState = new Elysia()
  .use(shoppingListContext)
  .patch('/visibility-state', async ({ shoppingListDoc }) => {
    shoppingListDoc.isVisible = !shoppingListDoc.isVisible;

    try {
      await shoppingListDoc.save();
    } catch {
      throw new NotificationError('Mongo Error');
    }

    return <ShoppingListCard shoppingListDoc={shoppingListDoc} />;
  });
