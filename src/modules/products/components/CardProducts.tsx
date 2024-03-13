import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { getRoundedQuantity } from '@utils/getRoundedQuantity';

import { type Product } from '../models/product';

const _t = $t('products');
const _tShared = $t('_shared');

type CardProductsProps = {
  products: Product[];
};

export function CardProducts({ products }: ComponentProps<CardProductsProps>) {
  return (
    <>
      <h4 class="mb-2 text-sm">{_tShared('_shared.products')}:</h4>

      {products.length > 0 ? (
        <ul class="max-h-40 overflow-y-auto">
          {products.map(({ name, quantity, unit }) => (
            <li class="flex justify-between text-xs">
              <span>{name}</span>
              
              {quantity && (
                <span>
                  {getRoundedQuantity(quantity)} {unit}
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <span>{_t('_shared.noProducts')}</span>
      )}
    </>
  );
}
