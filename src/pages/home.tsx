import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { FavoriteMealsSection } from '@meals/components/FavoriteMealsSection';
import { FavoriteShoppingListsSection } from '@shopping-lists/components/FavoriteShoppingListsSection';

export const homePage = new Elysia().use(context).get(
  '/',
  ({ user }) => {
    return (
      <Document user={user}>
        <>
          <FavoriteShoppingListsSection user={user!} />
          <FavoriteMealsSection user={user!} />
        </>
      </Document>
    );
  },
  {
    error({ error }) {
      console.log(error);
    },
  },
);
