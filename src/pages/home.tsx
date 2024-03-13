import { Elysia } from 'elysia';

import { context } from '@/context';

export const homePage = new Elysia().use(context).get('/', ({ set }) => {
  set.redirect = '/shopping-lists';
});
