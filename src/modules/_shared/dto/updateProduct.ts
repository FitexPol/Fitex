import { t } from 'elysia';

import { nameValidators } from './addProduct';
import { type DTO } from '../types';

export const updateProductDTO = t.Object({
  name: t.String(nameValidators),
  quantity: t.Optional(t.String()),
  unit: t.Optional(t.String()),
}) satisfies DTO;
