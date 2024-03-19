import { Elysia } from 'elysia';

import { addProduct } from './addProduct';
import { addProducts } from './addProducts';
import { deleteProduct } from './deleteProduct';
import { toggleCheckState } from './toggleCheckState';
import { updateProduct } from './updateProduct';

export const productsApi = new Elysia().group('/products', (app) =>
  app
    .use(addProduct)
    .use(addProducts)
    .group(':productId', (app) => app.use(updateProduct).use(toggleCheckState).use(deleteProduct)),
);
