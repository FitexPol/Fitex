import { icons } from 'feather-icons';

import { Button } from '@components/Button';
import { Table } from '@components/Table';
import { type ComponentProps } from '@types';
import { $t, Lang } from '@utils/$t';

import { Product } from '../models/product';

const _t = $t('products');

type ProductProps = {
  lang?: Lang;
};

export async function Products({ lang = Lang.Pl }: ComponentProps<ProductProps>) {
  const productDocs = await Product.find()
    .limit(50)
    .sort({ [`name.${lang}`]: 1 })
    .exec();

  return (
    <Table>
      <>
        <Table.Header>
          <>
            <Table.Header.Item>PL</Table.Header.Item>
            <Table.Header.Item>EN</Table.Header.Item>
            <Table.Header.Item>Kategoria</Table.Header.Item>
            <Table.Header.Item>Akcje</Table.Header.Item>
          </>
        </Table.Header>

        <Table.Body>
          <>
            {productDocs.map(({ id, name, category }) => (
              <Table.Body.Row firstItem={name['pl-PL']}>
                <>
                  <Table.Body.Row.Cell>{name['en-US']}</Table.Body.Row.Cell>
                  <Table.Body.Row.Cell>{category}</Table.Body.Row.Cell>

                  <Table.Body.Row.Cell>
                    <>
                      <Button
                        class="pico-reset !mr-4"
                        hx-delete={`/api/products/${id}`}
                        hx-target="closest section"
                        hx-swap="outerHTML"
                        hx-confirm={_t('products.deletionConfirmation')}
                        hx-indicator="#loader"
                      >
                        {icons.trash.toSvg()}
                      </Button>

                      <Button class="pico-reset" hx-get={`/api/products/${id}/modal`} hx-indicator="#loader">
                        {icons.edit.toSvg()}
                      </Button>
                    </>
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
