import { Elysia } from 'elysia';

import { getProductFieldset } from './getProductFieldset';

export const productsApi = new Elysia().group('/products', (app) => app.use(getProductFieldset));
