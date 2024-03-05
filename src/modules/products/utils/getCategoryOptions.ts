import { type SelectOption } from '@components/inputs/Select';
import { Lang } from '@utils/$t';

import { Category } from '../models/category';

export async function getCategoryOptions(lang: Lang = Lang.Pl): Promise<SelectOption[]> {
  const categoryDocs = await Category.find()
    .sort({ [`name.${lang}`]: 1 })
    .exec();

  return categoryDocs.map(({ id, name }) => ({
    value: id,
    label: name[lang],
  }));
}
