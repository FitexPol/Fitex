import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { MealSection } from '@meals/components/MealSection';

export const mealPage = new Elysia().use(context).get('/:id', async ({ user, params: { id } }) => {
  return (
    <Document user={user}>
      <MealSection user={user!} mealId={id} />
    </Document>
  );
});
