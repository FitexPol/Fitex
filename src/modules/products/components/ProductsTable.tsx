import { icons } from 'feather-icons';

import { Button } from '@components/Button';
import { Link } from '@components/Link';
import { Table } from '@components/Table';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { getPath } from '@utils/getPath';

import { type ProductDoc } from '../models/product';

const _t = $t('products');
const _tShared = $t('_shared');

type ProductsTableProps = {
  products: ProductDoc[];
  actionPaths: {
    edit: string;
    delete: string;
  };
};

export function ProductsTable({ products, actionPaths }: ComponentProps<ProductsTableProps>) {
  return (
    <Table id="products">
      <>
        <Table.Header>
          <>
            <Table.Header.Item>{_tShared('_shared.forms.name')}</Table.Header.Item>
            <Table.Header.Item>{_tShared('_shared.forms.quantity')}</Table.Header.Item>
            <Table.Header.Item>{_t('_shared.unit')}</Table.Header.Item>
            <Table.Header.Item>{_t('productsTable.actions')}</Table.Header.Item>
          </>
        </Table.Header>

        <Table.Body>
          <>
            {products.map((product) => (
              <Table.Body.Row firstItem={product.name}>
                <>
                  <Table.Body.Row.Cell>
                    <>{product.quantity}</>
                  </Table.Body.Row.Cell>

                  <Table.Body.Row.Cell>{product.unit}</Table.Body.Row.Cell>

                  <Table.Body.Row.Cell>
                    <div class="flex items-center gap-2">
                      <Link
                        href={getPath(actionPaths.edit, {
                          productId: product.id,
                        })}
                      >
                        {icons['edit'].toSvg()}
                      </Link>

                      <Button
                        class="pico-reset !text-inherit"
                        hx-delete={`${actionPaths.delete}/${product.id}`}
                        hx-target="#products"
                        hx-swap="outerHTML"
                        hx-confirm={_t('productsTable.deletionConfirmation')}
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
