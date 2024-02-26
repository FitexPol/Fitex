import { $t } from '@utils/$t';

import { type ProductDoc } from '../models/product';

const _t = $t('products');

export function getProductName(name: ProductDoc['name']): string {
  return _t(`getProductName.${name}`);
}
