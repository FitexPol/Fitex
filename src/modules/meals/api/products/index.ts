import { Elysia } from 'elysia';

import { addProduct } from './addProduct';
import { deleteProduct } from './deleteProduct';
import { updateProduct } from './updateProduct';

export const productsApi = new Elysia().group('/products', (app) =>
  app.use(addProduct).group('/:productId', (app) => app.use(updateProduct).use(deleteProduct)),
);
