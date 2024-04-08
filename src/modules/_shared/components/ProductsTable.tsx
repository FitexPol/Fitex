import { Button } from './Button';
import { Icon } from './Icon';
import { Link } from './Link';
import { Table } from './Table';
import type { BasePath, Entity } from '../types';
import { $t } from '../utils/$t';
import { getPath } from '../utils/getPath';

type ProductsTableProps<T extends Entity> = {
  entity: T;
  basePath: BasePath;
};

export function ProductsTable<T extends Entity>({ entity, basePath }: ProductsTableProps<T>) {
  return (
    <Table id="products" class="mt-2">
      <Table.Header>
        <Table.Header.Item>{Html.escapeHtml($t('_name'))}</Table.Header.Item>
        <Table.Header.Item>{Html.escapeHtml($t('_quantity'))}</Table.Header.Item>
        <Table.Header.Item>{Html.escapeHtml($t('_unit'))}</Table.Header.Item>
        <Table.Header.Item>{Html.escapeHtml($t('_actions'))}</Table.Header.Item>
      </Table.Header>

      <Table.Body>
        {entity.products
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((product) => (
            <Table.Body.Row firstItem={product.name}>
              <Table.Body.Row.Cell>{product.quantity}</Table.Body.Row.Cell>
              <Table.Body.Row.Cell>{product.unit}</Table.Body.Row.Cell>

              <Table.Body.Row.Cell>
                <div class="flex items-center gap-2">
                  <Button
                    class="pico-reset !text-inherit"
                    hx-delete={`/api/${basePath}/${entity.id}/products/${product.id}`}
                    hx-target="#products"
                    hx-swap="outerHTML"
                    hx-confirm={$t('_deletionConfirmation')}
                    hx-indicator="#loader"
                  >
                    <Icon type="trash" />
                  </Button>

                  <Link
                    href={getPath(`/${basePath}/${entity.id}/product`, {
                      productId: product.id,
                    })}
                  >
                    <Icon type="edit" />
                  </Link>
                </div>
              </Table.Body.Row.Cell>
            </Table.Body.Row>
          ))}
      </Table.Body>
    </Table>
  );
}
