import { icons } from 'feather-icons';

import { Button } from '@components/Button';
import { Input } from '@components/inputs/Input';
import { Link } from '@components/Link';
import { Pagination } from '@components/Pagination';
import { Table } from '@components/Table';
import { type ComponentProps } from '@types';
import { $t, Lang } from '@utils/$t';
import { getItemsPerPageOption } from '@utils/getItemPerPageOption';
import { getPage } from '@utils/getPage';
import { getPath } from '@utils/getPath';
import { getSkipValue } from '@utils/getSkipValue';

import { Product } from '../models/product';

const _t = $t('products');
const _tShared = $t('_shared');

type ProductProps = {
  lang?: Lang;
  itemsPerPageQuery: string;
  pageQuery: string;
};

export async function Products({
  itemsPerPageQuery,
  pageQuery,
  lang = Lang.Pl,
}: ComponentProps<ProductProps>) {
  const itemsPerPage: number = getItemsPerPageOption(itemsPerPageQuery);
  const page = getPage(pageQuery);
  const totalProductDocs = await Product.countDocuments();

  const productDocs = await Product.find()
    .skip(getSkipValue(page, itemsPerPage))
    .limit(itemsPerPage)
    .sort({ [`name.${lang}`]: 1 })
    .exec();

  return (
    <div>
      <Link href="/admin-panel/products/form">
        <>
          {_t('products.createProduct')}
          {icons['plus-circle'].toSvg({ class: 'inline ml-2' })}
        </>
      </Link>

      <fieldset class="!gri-cols-3 mb-0 mt-4 grid">
        <Input control={{ name: 'pl', type: 'text', placeholder: 'products.products.filters.pl' }} />
        <Input control={{ name: 'pl', type: 'text', placeholder: 'products.products.filters.en' }} />
        <Input control={{ name: 'pl', type: 'text', placeholder: 'products.products.filters.category' }} />
      </fieldset>

      <Table>
        <>
          <Table.Header>
            <>
              <Table.Header.Item>{_t('_shared.pl')}</Table.Header.Item>
              <Table.Header.Item>{_t('_shared.en')}</Table.Header.Item>
              <Table.Header.Item>{_t('_shared.category')}</Table.Header.Item>
              <Table.Header.Item>{_tShared('_shared.actions')}</Table.Header.Item>
            </>
          </Table.Header>

          <Table.Body>
            <>
              {productDocs.map(({ id, name, category }) => (
                <Table.Body.Row firstItem={name['pl-PL']}>
                  <>
                    <Table.Body.Row.Cell>{name['en-US']}</Table.Body.Row.Cell>
                    <Table.Body.Row.Cell>
                      {category ? _tShared(`_shared.productCategories.${category}`) : category}
                    </Table.Body.Row.Cell>

                    <Table.Body.Row.Cell>
                      <div class="flex gap-4">
                        <Button
                          class="pico-reset !text-inherit"
                          hx-delete={`/api/products/${id}`}
                          hx-target="closest section"
                          hx-swap="outerHTML"
                          hx-confirm={_t('products.deletionConfirmation')}
                          hx-indicator="#loader"
                        >
                          {icons.trash.toSvg()}
                        </Button>

                        <Link href={getPath('/admin-panel/products/form', { productId: id })}>
                          {icons.edit.toSvg()}
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

      <Pagination
        itemsPerPage={itemsPerPage}
        page={page}
        totalCount={totalProductDocs}
        path="/admin-panel/products"
        currentQuery={{ itemsPerPage: itemsPerPageQuery }}
      />
    </div>
  );
}
