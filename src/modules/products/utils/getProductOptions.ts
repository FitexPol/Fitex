import { type SelectOption } from '@components/inputs/Select';

import { getProductName } from './getProductName';
import { Product } from '../models/product';

export async function getProductOptions(): Promise<SelectOption[]> {
  const productDocs = await Product.find().sort({ name: 1 });

  return productDocs.map(({ id, name }) => ({
    value: id,
    label: getProductName(name),
  }));
}
