import { icons } from 'feather-icons';
import { type FilterQuery } from 'mongoose';

import { Button } from '@components/Button';
import { Dropdown } from '@components/Dropdown';
import { Input } from '@components/inputs/Input';
import { type SelectOption } from '@components/inputs/Select';
import { Link } from '@components/Link';
import { Pagination } from '@components/Pagination';
import { Table } from '@components/Table';
import type { ComponentProps, SortOption } from '@types';
import { $t } from '@utils/$t';
import { getItemsPerPageOption } from '@utils/getItemPerPageOption';
import { getPage } from '@utils/getPage';
import { getPath } from '@utils/getPath';
import { getPopulatedDoc } from '@utils/getPopulatedDoc';
import { getSkipValue } from '@utils/getSkipValue';
import { itemsPerPageOptions } from '@vars';

import { Product } from '../models/product';
import { getCategoryOptions } from '../utils/getCategoryOptions';

const _t = $t('products');
const _tShared = $t('_shared');

enum SortQuery {
  NamePlAsc = 'name.pl-PL-asc',
  NamePlDesc = 'name.pl-PL-desc',
}

type ProductProps = {
  plNameQuery: string;
  categoryQuery: string;
  sortQuery: string;
  itemsPerPageQuery: string;
  pageQuery: string;
};

export async function Products({
  plNameQuery,
  categoryQuery,
  sortQuery,
  itemsPerPageQuery,
  pageQuery,
}: ComponentProps<ProductProps>) {
  const { label: sortLabel, value: sortValue }: ProductsSortOption = getSortOption(sortQuery);
  const itemsPerPage: number = getItemsPerPageOption(itemsPerPageQuery);
  const page = getPage(pageQuery);
  const categoryOptions: SelectOption[] = await getCategoryOptions();
  const filters: FilterQuery<typeof Product> = {};

  if (plNameQuery) {
    filters['name.pl-PL'] = { $regex: new RegExp(plNameQuery, 'i') };
  }

  if (categoryQuery) {
    filters['category'] = categoryQuery;
  }

  const totalProductDocs = await Product.countDocuments(filters);

  const productDocs = await Product.find(filters)
    .skip(getSkipValue(page, itemsPerPage))
    .limit(itemsPerPage)
    .sort(sortValue)
    .populate('category')
    .exec();

  return (
    <div id="products">
      <div class="flex flex-col justify-between gap-y-4 sm:flex-row sm:items-center">
        <Link href="/admin-panel/products/form">
          <>
            {_t('products.createProduct')}
            {icons['plus-circle'].toSvg({ class: 'inline ml-2' })}
          </>
        </Link>

        <Dropdown label={`${_tShared('_shared.itemsPerPage')}: ${itemsPerPage}`}>
          <>
            {itemsPerPageOptions.map(({ label, query }) => (
              <Dropdown.Item active={query === itemsPerPage.toString()}>
                <Link
                  href={getPath('/admin-panel/products', {
                    itemsPerPage: query,
                    sort: sortQuery,
                    ['name.pl-PL']: plNameQuery,
                    category: categoryQuery,
                  })}
                >
                  {label}
                </Link>
              </Dropdown.Item>
            ))}
          </>
        </Dropdown>
      </div>

      <fieldset class="mb-6 mt-4 grid !gap-y-0 md:mb-0 md:grid-cols-2">
        <Input
          control={{ name: 'name.pl-PL', type: 'search', placeholder: 'products._shared.filters.pl' }}
          value={plNameQuery}
          hx-get="/api/products"
          hx-trigger="input changed delay:500ms, search"
        />

        <Dropdown
          label={`${_t('products.filters.category')}: ${categoryQuery ? categoryOptions.find(({ value }) => value === categoryQuery)?.label : _tShared(`_shared.all`)}`}
        >
          <>
            <Dropdown.Item active={!categoryQuery}>
              <Link
                href={getPath('/admin-panel/products', {
                  itemsPerPage: itemsPerPageQuery,
                  sort: sortQuery,
                  ['name.pl-PL']: plNameQuery,
                })}
              >
                {_tShared(`_shared.all`)}
              </Link>
            </Dropdown.Item>

            {categoryOptions.map(({ value, label }) => (
              <Dropdown.Item active={value === categoryQuery}>
                <Link
                  href={getPath('/admin-panel/products', {
                    itemsPerPage: itemsPerPageQuery,
                    sort: sortQuery,
                    ['name.pl-PL']: plNameQuery,
                    category: value,
                  })}
                >
                  {label}
                </Link>
              </Dropdown.Item>
            ))}
          </>
        </Dropdown>
      </fieldset>

      <Table>
        <>
          <Table.Header>
            <>
              <Table.Header.Item>
                <Link
                  href={getPath('/admin-panel/products', {
                    sort: sortLabel === SortQuery.NamePlAsc ? SortQuery.NamePlDesc : SortQuery.NamePlAsc,
                    itemsPerPage: itemsPerPageQuery,
                    ['name.pl-PL']: plNameQuery,
                    category: categoryQuery,
                  })}
                  class="inline-flex items-center gap-1"
                >
                  <>
                    {_t('_shared.pl')}
                    {sortLabel === SortQuery.NamePlAsc && icons['arrow-up'].toSvg()}
                    {sortLabel === SortQuery.NamePlDesc && icons['arrow-down'].toSvg()}
                  </>
                </Link>
              </Table.Header.Item>

              <Table.Header.Item>{_t('_shared.category')}</Table.Header.Item>
              <Table.Header.Item>{_tShared('_shared.actions')}</Table.Header.Item>
            </>
          </Table.Header>

          <Table.Body>
            <>
              {productDocs.map(({ id, name, category }) => {
                const categoryDoc = getPopulatedDoc(category);

                return (
                  <Table.Body.Row firstItem={name['pl-PL']}>
                    <>
                      <Table.Body.Row.Cell>{categoryDoc?.name['pl-PL']}</Table.Body.Row.Cell>

                      <Table.Body.Row.Cell>
                        <div class="flex gap-4">
                          <Button
                            class="pico-reset !text-inherit"
                            hx-delete={`/api/products/${id}`}
                            hx-target="#products"
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
                );
              })}
            </>
          </Table.Body>
        </>
      </Table>

      <Pagination
        itemsPerPage={itemsPerPage}
        page={page}
        totalCount={totalProductDocs}
        path="/admin-panel/products"
        currentQuery={{
          itemsPerPage: itemsPerPageQuery,
          sort: sortQuery,
          ['name.pl-PL']: plNameQuery,
          category: categoryQuery,
        }}
      />
    </div>
  );
}

type SortValues = Partial<Record<'name.pl-PL', -1 | 1>>;
type ProductsSortOption = SortOption<SortValues>;

function getSortOption(queryParam: string): ProductsSortOption {
  switch (queryParam) {
    case SortQuery.NamePlDesc:
      return {
        label: SortQuery.NamePlDesc,
        value: { 'name.pl-PL': -1 },
      };
    default:
      return {
        label: SortQuery.NamePlAsc,
        value: { 'name.pl-PL': 1 },
      };
  }
}
