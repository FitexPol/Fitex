import { icons } from 'feather-icons';

import { type User } from '@auth/models/user';
import { Dropdown } from '@components/Dropdown';
import { Pagination } from '@components/Pagination';
import { Tiles } from '@components/Tiles';
import { type ComponentProps, type SortOption } from '@types';
import { $t } from '@utils/$t';
import { getItemsPerPageOption } from '@utils/getItemPerPageOption';
import { getPage } from '@utils/getPage';
import { getPath } from '@utils/getPath';
import { getSkipValue } from '@utils/getSkipValue';
import { itemsPerPageOptions } from '@vars';

import { ShoppingList } from '../models/shoppingList';

const _t = $t('shoppingLists');
const _tShared = $t('_shared');

enum SortQuery {
  NameAsc = 'name-asc',
  NameDesc = 'name-desc',
  CreationDateAsc = 'creationDate-asc',
  CreationDateDesc = 'creationDate-desc',
}

const sortOptions = [
  { label: _t('shoppingListsSection.sortLabels.nameAsc'), query: SortQuery.NameAsc },
  { label: _t('shoppingListsSection.sortLabels.nameDesc'), query: SortQuery.NameDesc },
  { label: _t('shoppingListsSection.sortLabels.creationDateAsc'), query: SortQuery.CreationDateAsc },
  { label: _t('shoppingListsSection.sortLabels.creationDateDesc'), query: SortQuery.CreationDateDesc },
];

type ShoppingListsSectionProps = {
  user: User;
  sortQuery: string;
  itemsPerPageQuery: string;
  pageQuery: string;
};

export async function ShoppingListsSection({
  user,
  sortQuery,
  itemsPerPageQuery,
  pageQuery,
}: ComponentProps<ShoppingListsSectionProps>) {
  const { label: sortLabel, value: sortValue }: ShoppingListsSortOption = getSortOption(sortQuery);
  const itemsPerPage: number = getItemsPerPageOption(itemsPerPageQuery);
  const page = getPage(pageQuery);
  const totalShoppingListDocs = await ShoppingList.countDocuments({ author: user.id });

  const shoppingListDocs = await ShoppingList.find({ author: user.id })
    .skip(getSkipValue(page, itemsPerPage))
    .limit(itemsPerPage)
    .sort(sortValue)
    .exec();

  return (
    <section id="shopping-lists-section">
      <div class="mb-6 flex justify-between">
        <div class="flex items-center gap-2">
          <h1>{_t('shoppingListsSection.title')}</h1>
          <a href="/shopping-lists/form" hx-indicator="#loader" hx-boost="true">
            {icons['plus-circle'].toSvg()}
          </a>
        </div>

        <div class="flex gap-2">
          <Dropdown label={`${_tShared('_shared.itemsPerPage')}: ${itemsPerPage}`}>
            <>
              {itemsPerPageOptions.map(({ label, query }) => (
                <Dropdown.Item active={query === itemsPerPage.toString()}>
                  <a
                    hx-boost="true"
                    href={getPath('/shopping-lists', { itemsPerPage: query, sort: sortQuery })}
                    hx-indicator="#loader"
                  >
                    {label}
                  </a>
                </Dropdown.Item>
              ))}
            </>
          </Dropdown>

          <Dropdown label={`${_tShared('_shared.sort')}: ${sortLabel}`}>
            <>
              {sortOptions.map(({ label, query }) => (
                <Dropdown.Item active={label === sortLabel}>
                  <a
                    hx-boost="true"
                    href={getPath('/shopping-lists', {
                      itemsPerPage: itemsPerPageQuery,
                      sort: query,
                    })}
                    class="capitalize"
                    hx-indicator="#loader"
                  >
                    {label}
                  </a>
                </Dropdown.Item>
              ))}
            </>
          </Dropdown>
        </div>
      </div>

      <Tiles count={shoppingListDocs.length} noResultsMessage={_t('shoppingListsSection.noResults')}>
        <>
          {shoppingListDocs.map(() => (
            <Tiles.Item>
              <span>Test</span>
            </Tiles.Item>
          ))}
        </>
      </Tiles>

      <Pagination
        itemsPerPage={itemsPerPage}
        page={page}
        totalCount={totalShoppingListDocs}
        path="/shopping-lists"
        currentQuery={{ sort: sortQuery, itemsPerPage: itemsPerPageQuery }}
      />
    </section>
  );
}

type SortValues = Record<keyof ShoppingList, -1 | 1>;
type ShoppingListsSortOption = SortOption<Pick<SortValues, 'name'> | Pick<SortValues, 'creationDate'>>;

function getSortOption(queryParam: string): ShoppingListsSortOption {
  switch (queryParam) {
    case SortQuery.NameAsc:
      return {
        label: sortOptions[0].label,
        value: { name: 1 },
      };
    case SortQuery.NameDesc:
      return {
        label: sortOptions[1].label,
        value: { name: -1 },
      };
    case SortQuery.CreationDateAsc:
      return {
        label: sortOptions[2].label,
        value: { creationDate: 1 },
      };
    default:
      return {
        label: sortOptions[3].label,
        value: { creationDate: -1 },
      };
  }
}
