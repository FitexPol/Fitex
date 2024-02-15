import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { MealsSection } from '@meals/components/MealsSection';

export const mealsPage = new Elysia().use(context).get('/meals', async ({ user, query }) => {
  return (
    <Document user={user}>
      <MealsSection user={user!} sortQuery={query.sort ?? ''} />
    </Document>
  );
});
