import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { MealEditSection } from '@meals/components/MealEditSection';

export const mealEditPage = new Elysia().use(context).get('/edit', ({ user, params: { id } }) => (
  <Document user={user}>
    <MealEditSection user={user!} mealId={id} />
  </Document>
));
