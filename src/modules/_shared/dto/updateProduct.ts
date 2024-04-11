import { t } from 'elysia';

import { nameValidators } from './addProduct';
import { productSchema } from '../models/product';

const quantityOptions = productSchema.path('quantity').options;

export const updateProductDTO = t.Object({
  name: t.String(nameValidators),
  quantity: t.Optional(
    t.Number({
      minimum: quantityOptions.min,
      error: 'Must be at least 0',
    }),
  ),
  unit: t.String(),
});
