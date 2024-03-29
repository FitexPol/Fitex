import { icons } from 'feather-icons';

import { Button } from '@components/Button';
import { Link } from '@components/Link';
import { Table } from '@components/Table';
import type { BasePath, Entity } from '@types';
import { $t } from '@utils/$t';
import { getPath } from '@utils/getPath';

type ProductsTableProps<T extends Entity> = {
  entity: T;
  basePath: BasePath;
};

export function ProductsTable<T extends Entity>({ entity, basePath }: ProductsTableProps<T>) {
  return (
    <Table id="products" class="mt-2">
      <>
        <Table.Header>
          <>
            <Table.Header.Item>{$t('_name')}</Table.Header.Item>
            <Table.Header.Item>{$t('_quantity')}</Table.Header.Item>
            <Table.Header.Item>{$t('_unit')}</Table.Header.Item>
            <Table.Header.Item>{$t('_actions')}</Table.Header.Item>
          </>
        </Table.Header>

        <Table.Body>
          <>
            {entity.products
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((product) => (
                <Table.Body.Row firstItem={product.name}>
                  <>
                    <Table.Body.Row.Cell>
                      <>{product.quantity}</>
                    </Table.Body.Row.Cell>

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
                          {icons.trash.toSvg()}
                        </Button>

                        <Link
                          href={getPath(`/${basePath}/${entity.id}/product`, {
                            productId: product.id,
                          })}
                        >
                          {icons['edit'].toSvg()}
                        </Link>
                      </div>
                    </Table.Body.Row.Cell>
                  </>
                </Table.Body.Row>
              ))}
          </>
        </Table.Body>
      </>
    </Table>
  );
}
