import { Elysia } from 'elysia';

import { getProductFieldset } from './getProductForm';

export const productsApi = new Elysia().group('/products', (app) => app.use(getProductFieldset));
