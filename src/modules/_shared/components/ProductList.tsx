import { Button } from './Button';
import { Icon } from './Icon';
import { Checkbox } from './inputs/Checkbox';
import { Link } from './Link';
import { type ProductDoc } from '../models/product';
import type { BasePath, Entity } from '../types';
import { $t } from '../utils/$t';
import { getPath } from '../utils/getPath';
import { getRoundedQuantity } from '../utils/getRoundedQuantity';

type ProductListProps<T extends Entity> = {
  entity: T;
  basePath: BasePath;
};

export function ProductList<T extends Entity>({ entity, basePath }: ProductListProps<T>) {
  return entity.products.length > 0 ? (
    <ul class="mt-2">
      {entity.products
        .filter((product) => !product.isChecked)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((product) => (
          <Item entity={entity} basePath={basePath} product={product} isChecked={false} />
        ))}

      {entity.products
        .filter((product) => product.isChecked)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((product) => (
          <Item entity={entity} basePath={basePath} product={product} isChecked />
        ))}
    </ul>
  ) : (
    <span safe>{$t('products.noProducts')}</span>
  );
}

type ItemProps = {
  entity: Entity;
  basePath: BasePath;
  product: ProductDoc;
  isChecked: boolean;
};

function Item({ entity, basePath, product, isChecked }: ItemProps) {
  function getHxAttributes({ id }: ProductDoc): Htmx.Attributes {
    return {
      'hx-patch': `/api/${basePath}/${entity.id}/products/${id}/check-state`,
      'hx-target': 'closest ul',
      'hx-swap': 'outerHTML',
      'hx-indicator': '#loader',
    };
  }

  function getProduct({ name, quantity, unit }: ProductDoc) {
    return (
      <>
        {Html.escapeHtml(name)} - {Html.escapeHtml(getRoundedQuantity(quantity))}
        {unit}
      </>
    );
  }

  return (
    <li class="flex items-center justify-between gap-4">
      <Checkbox name={product.name} {...getHxAttributes(product)} isChecked={isChecked}>
        {isChecked ? <s>{getProduct(product)}</s> : getProduct(product)}
      </Checkbox>

      <div class="flex items-center gap-2">
        <Button
          class="pico-reset !text-inherit"
          hx-delete={`/api/${basePath}/${entity.id}/products/${product.id}`}
          hx-target="closest ul"
          hx-swap="outerHTML"
          hx-confirm={$t('_deletionConfirmation')}
          hx-indicator="#loader"
        >
          <Icon type="trash" class="size-5" />
        </Button>

        <Link
          href={getPath(`/${basePath}/${entity.id}/product`, {
            productId: product.id,
          })}
        >
          <Icon type="edit" class="size-5" />
        </Link>
      </div>
    </li>
  );
}
