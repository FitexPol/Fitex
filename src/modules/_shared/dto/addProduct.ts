import { t } from 'elysia';

import { productSchema } from '../models/product';
import { type TStringOptions } from '../types';

const nameOptions = productSchema.path('name').options;

export const nameValidators: TStringOptions = {
  maxLength: nameOptions.maxlength,
  error: 'Product name is required',
};

export const addProductDTO = t.Object({
  name: t.String(nameValidators),
});
