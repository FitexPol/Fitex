import { Elysia } from 'elysia';

import { context } from '@/context';
import { $t } from '@utils/$t';
import { NotificationError } from '@utils/errors/NotificationError';

import { shoppingListContext } from './context';
import { ShoppingListCard } from '../components/ShoppingListCard';

export const toggleVisibilityState = new Elysia()
  .use(context)
  .use(shoppingListContext)
  .patch('visibility-state', async ({ shoppingListDoc }) => {
    shoppingListDoc.isVisible = !shoppingListDoc.isVisible;

    try {
      await shoppingListDoc.save();
    } catch {
      throw new NotificationError({ status: 500, message: $t('_errors.mongoError') });
    }

    return <ShoppingListCard shoppingListDoc={shoppingListDoc} />;
  });
