import { Elysia } from 'elysia';

import { addProduct } from './addProduct';
import { addProducts } from './addProducts';
import { deleteProduct } from './deleteProduct';
import { updateProduct } from './updateProduct';

export const productsApi = new Elysia().group('/products', (app) =>
  app.use(addProduct).use(addProducts).use(updateProduct).use(deleteProduct),
);
