import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { FavoriteMealsSection } from '@meals/components/FavoriteMealsSection';

export const homePage = new Elysia().use(context).get('/', ({ user }) => (
  <Document user={user}>
    <FavoriteMealsSection user={user!} />
  </Document>
));
