import { type SelectOption } from '@components/inputs/Select';
import { Lang } from '@utils/$t';

import { Product } from '../models/product';

export async function getProductOptions(lang: Lang = Lang.Pl): Promise<SelectOption[]> {
  const productDocs = await Product.find().sort({ [`name.${lang}`]: 1 });

  return productDocs.map(({ id, name }) => ({
    value: id,
    label: name[lang],
  }));
}
