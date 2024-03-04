import { Elysia } from 'elysia';

import { context } from '@/context';
import { Role } from '@auth/models/user';

import { createProduct } from './createProduct';
import { deleteProduct } from './deleteProduct';
import { getProductFieldset } from './getProductFieldset';
import { getProducts } from './getProducts';
import { updateProduct } from './updateProduct';

export const productsApi = new Elysia().use(context).group('/products', (app) =>
  app.use(getProductFieldset).guard(
    {
      beforeHandle: ({ user, set }) => {
        if (!user!.hasRole(Role.Admin, Role.SuperAdmin)) {
          set.redirect = '/';

          return 'Unauthorized';
        }
      },
    },
    (app) => app.use(getProducts).use(createProduct).use(updateProduct).use(deleteProduct),
  ),
);
