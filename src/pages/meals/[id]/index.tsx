import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';

import { mealEditPage } from './edit';
import { productFormPage } from './product-form';

const mealPage = new Elysia().use(context).get('', async ({ user }) => {
  return <Document user={user}>Meal</Document>;
});

export const mealPages = new Elysia().group('/:id', (app) =>
  app.use(mealPage).use(mealEditPage).use(productFormPage),
);
