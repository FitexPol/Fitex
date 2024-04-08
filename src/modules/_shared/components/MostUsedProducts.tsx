import { Button } from './Button';
import { Icon } from './Icon';
import { Input } from './inputs/Input';
import type { BasePath, Entity } from '../types';
import { $tm } from '../utils/$tm';

type MostUsedProductsProps<T extends Entity> = {
  productNames: string[];
  basePath: BasePath;
  entity: T;
};

export function MostUsedProducts<T extends Entity>({
  productNames,
  basePath,
  entity,
}: MostUsedProductsProps<T>) {
  return (
    <ul id="most-used-products" class="mt-2">
      {productNames.map((productName) => (
        <li
          class={$tm(
            'm-0',
            entity.products.some((product) => product.name === productName) &&
              'pointer-events-none opacity-50',
          )}
        >
          <form
            hx-post={`/api/${basePath}/${entity.id}/products`}
            hx-target="#most-used-products"
            hx-swap="outerHTML"
            class="grid !grid-cols-12"
          >
            <Input
              control={{ name: 'name', type: 'text' }}
              value={productName}
              class="pointer-events-none col-span-10 mb-0 sm:col-span-11"
            />

            <Button type="submit" class="pico-reset col-span-2 !m-auto !mt-5 h-fit !w-fit sm:col-span-1">
              <Icon type="plus-circle" />
            </Button>
          </form>
        </li>
      ))}
    </ul>
  );
}
