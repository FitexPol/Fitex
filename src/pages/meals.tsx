import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { Meals } from '@meals/components/Meals';

export const mealsPage = new Elysia().use(context).get('/meals', async ({ user }) => {
  return <Document user={user}>{user ? <Meals user={user} /> : <></>}</Document>;
});
