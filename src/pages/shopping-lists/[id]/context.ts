/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Elysia } from 'elysia';

import { PageNotFoundError } from '@errors/PageNotFoundError';
import { PageNotPermittedError } from '@errors/PageNotPermitted';
import { ShoppingList } from '@shopping-lists/models/shoppingList';

import { userContext } from '../../context';

export const shoppingListContext = (app: Elysia) =>
  app.use(userContext).derive({ as: 'scoped' }, async ({ params: { id }, user }) => {
    const shoppingListDoc = await ShoppingList.findById(id).exec();

    if (!shoppingListDoc) throw new PageNotFoundError();
    if (!shoppingListDoc.author._id.equals(user.id)) throw new PageNotPermittedError();

    return {
      shoppingListDoc,
      user,
    };
  });
