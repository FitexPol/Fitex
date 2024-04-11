import { t } from 'elysia';

import { productSchema } from '../models/product';
import type { DTO, TStringOptions } from '../types';
import { $t } from '../utils/$t';

const nameOptions = productSchema.path('name').options;

export const nameValidators: TStringOptions = {
  maxLength: nameOptions.maxlength,
  error: $t('products.errors.productNameRequired'),
};

export const addProductDTO = t.Object({
  name: t.String(nameValidators),
}) satisfies DTO;
