import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { type Product } from '../models/product';

const _t = $t('products');
const _tShared = $t('_shared');

type ListProductsProps = {
  products: Product[];
};

export function ListProducts({ products, children }: ComponentProps<ListProductsProps>) {
  return (
    <>
      {children}

      {products.length > 0 ? (
        <ul>
          {products.map(({ name, quantity, unit }) => (
            <li>
              <label>
                <input type="checkbox" name={name} />
                {name} - {quantity} {unit}
              </label>
            </li>
          ))}
        </ul>
      ) : (
        <span>{_t('_shared.noProducts')}</span>
      )}
    </>
  );
}

function Title({ children }: ComponentProps) {
  return <h3 class="mb-1 mt-2 text-lg">{children ?? _tShared('_shared.products')}:</h3>;
}

ListProducts.Title = Title;
