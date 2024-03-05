import { Elysia } from 'elysia';

import { context } from '@/context';
import { Role } from '@auth/models/user';

import { createCategory } from './createCategory';
import { createProduct } from './createProduct';
import { deleteCategory } from './deleteCategory';
import { deleteProduct } from './deleteProduct';
import { getCategories } from './getCategories';
import { getProductFieldset } from './getProductFieldset';
import { getProducts } from './getProducts';
import { updateCategory } from './updateCategory';
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
    (app) =>
      app
        .use(getProducts)
        .use(createProduct)
        .use(updateProduct)
        .use(deleteProduct)
        .group('/categories', (app) =>
          app.use(getCategories).use(createCategory).use(updateCategory).use(deleteCategory),
        ),
  ),
);
