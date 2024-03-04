import { icons } from 'feather-icons';

import { Button } from '@components/Button';
import { Dropdown } from '@components/Dropdown';
import { Input } from '@components/inputs/Input';
import { Link } from '@components/Link';
import { Pagination } from '@components/Pagination';
import { Table } from '@components/Table';
import type { ComponentProps, SortOption } from '@types';
import { $t } from '@utils/$t';
import { getItemsPerPageOption } from '@utils/getItemPerPageOption';
import { getPage } from '@utils/getPage';
import { getPath } from '@utils/getPath';
import { getSkipValue } from '@utils/getSkipValue';
import { itemsPerPageOptions } from '@vars';

import { Category } from '../models/category';

const _t = $t('products');
const _tShared = $t('_shared');

enum SortQuery {
  NamePlAsc = 'name.pl-PL-asc',
  NamePlDesc = 'name.pl-PL-desc',
}

type CategoriesProps = {
  plNameQuery: string;
  sortQuery: string;
  itemsPerPageQuery: string;
  pageQuery: string;
};

export async function Categories({
  plNameQuery,
  sortQuery,
  itemsPerPageQuery,
  pageQuery,
}: ComponentProps<CategoriesProps>) {
  const { label: sortLabel, value: sortValue }: CategoriesSortOption = getSortOption(sortQuery);
  const itemsPerPage: number = getItemsPerPageOption(itemsPerPageQuery);
  const page = getPage(pageQuery);

  const totalCategoryDocs = await Category.countDocuments({
    'name.pl-PL': { $regex: new RegExp(plNameQuery, 'i') },
  });

  const categoryDocs = await Category.find({
    'name.pl-PL': { $regex: new RegExp(plNameQuery, 'i') },
  })
    .skip(getSkipValue(page, itemsPerPage))
    .limit(itemsPerPage)
    .sort(sortValue)
    .exec();

  return (
    <div id="categories">
      <div class="flex flex-col justify-between gap-y-4 sm:flex-row sm:items-center">
        <Link href="/admin-panel/categories/form">
          <>
            {_t('categories.createCategory')}
            {icons['plus-circle'].toSvg({ class: 'inline ml-2' })}
          </>
        </Link>

        <Dropdown label={`${_tShared('_shared.itemsPerPage')}: ${itemsPerPage}`}>
          <>
            {itemsPerPageOptions.map(({ label, query }) => (
              <Dropdown.Item active={query === itemsPerPage.toString()}>
                <Link
                  href={getPath('/admin-panel/categories', {
                    itemsPerPage: query,
                    sort: sortQuery,
                    ['name.pl-PL']: plNameQuery,
                  })}
                >
                  {label}
                </Link>
              </Dropdown.Item>
            ))}
          </>
        </Dropdown>
      </div>

      <fieldset class="mb-0 mt-4 grid">
        <Input
          control={{ name: 'name.pl-PL', type: 'search', placeholder: 'products._shared.filters.pl' }}
          value={plNameQuery}
          hx-get="/api/products/categories"
          hx-trigger="input changed delay:500ms, search"
        />
      </fieldset>

      <Table>
        <>
          <Table.Header>
            <>
              <Table.Header.Item>
                <Link
                  href={getPath('/admin-panel/categories', {
                    sort: sortLabel === SortQuery.NamePlAsc ? SortQuery.NamePlDesc : SortQuery.NamePlAsc,
                    itemsPerPage: itemsPerPageQuery,
                    ['name.pl-PL']: plNameQuery,
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

              <Table.Header.Item>{_tShared('_shared.actions')}</Table.Header.Item>
            </>
          </Table.Header>

          <Table.Body>
            <>
              {categoryDocs.map(({ id, name }) => (
                <Table.Body.Row firstItem={name['pl-PL']}>
                  <Table.Body.Row.Cell>
                    <div class="flex gap-4">
                      <Button
                        class="pico-reset !text-inherit"
                        hx-delete={`/api/products/categories/${id}`}
                        hx-target="#categories"
                        hx-swap="outerHTML"
                        hx-confirm={_t('categories.deletionConfirmation')}
                        hx-indicator="#loader"
                      >
                        {icons.trash.toSvg()}
                      </Button>

                      <Link href={getPath('/admin-panel/categories/form', { categoryId: id })}>
                        {icons.edit.toSvg()}
                      </Link>
                    </div>
                  </Table.Body.Row.Cell>
                </Table.Body.Row>
              ))}
            </>
          </Table.Body>
        </>
      </Table>

      <Pagination
        itemsPerPage={itemsPerPage}
        page={page}
        totalCount={totalCategoryDocs}
        path="/admin-panel/categories"
        currentQuery={{
          itemsPerPage: itemsPerPageQuery,
          sort: sortQuery,
          ['name.pl-PL']: plNameQuery,
        }}
      />
    </div>
  );
}

type SortValues = Partial<Record<'name.pl-PL', -1 | 1>>;
type CategoriesSortOption = SortOption<SortValues>;

function getSortOption(queryParam: string): CategoriesSortOption {
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
