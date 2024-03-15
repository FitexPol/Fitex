import { icons } from 'feather-icons';

import { Button } from '@components/Button';
import { Link } from '@components/Link';
import { Table } from '@components/Table';
import type { BasePath, ComponentProps, Entity } from '@types';
import { $t } from '@utils/$t';
import { getPath } from '@utils/getPath';

type ProductsTableProps<T extends Entity> = {
  entity: T;
  basePath: BasePath;
};

export function ProductsTable<T extends Entity>({ entity, basePath }: ComponentProps<ProductsTableProps<T>>) {
  return (
    <Table id="products">
      <>
        <Table.Header>
          <>
            <Table.Header.Item>{$t('name')}</Table.Header.Item>
            <Table.Header.Item>{$t('quantity')}</Table.Header.Item>
            <Table.Header.Item>{$t('unit')}</Table.Header.Item>
            <Table.Header.Item>{$t('actions')}</Table.Header.Item>
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
                        <Link
                          href={getPath(`/${basePath}/${entity.id}/product-form`, {
                            productId: product.id,
                          })}
                        >
                          {icons['edit'].toSvg()}
                        </Link>

                        <Button
                          class="pico-reset !text-inherit"
                          hx-delete={`/api/${basePath}/${entity.id}/products/${product.id}`}
                          hx-target="#products"
                          hx-swap="outerHTML"
                          hx-confirm={$t('deletionConfirmation')}
                          hx-indicator="#loader"
                        >
                          {icons.trash.toSvg()}
                        </Button>
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
