import { icons } from 'feather-icons';

import { Dropdown } from '@components/Dropdown';
import { Link } from '@components/Link';
import { Pagination } from '@components/Pagination';
import { Tiles } from '@components/Tiles';
import { type ComponentProps, type JWTUser, type SortOption } from '@types';
import { $t } from '@utils/$t';
import { getItemsPerPageOption } from '@utils/getItemPerPageOption';
import { getPage } from '@utils/getPage';
import { getPath } from '@utils/getPath';
import { getSkipValue } from '@utils/getSkipValue';
import { SortQuery, itemsPerPageOptions, sortOptions } from '@vars';

import { ShoppingListCard } from './ShoppingListCard';
import { ShoppingList, type ShoppingListDoc } from '../models/shoppingList';

const _t = $t('shoppingLists');
const _tShared = $t('_shared');

type ShoppingListsSectionProps = {
  user: JWTUser;
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
    .populate('meals.meal')
    .populate('products.product')
    .exec();

  return (
    <section id="shopping-lists-section">
      <div class="mb-6 flex justify-between">
        <div class="flex items-center gap-2">
          <h1>{_t('shoppingListsSection.title')}</h1>
          <Link href="/shopping-lists/form">{icons['plus-circle'].toSvg()}</Link>
        </div>

        <div class="flex gap-2">
          <Dropdown label={`${_tShared('_shared.itemsPerPage')}: ${itemsPerPage}`}>
            <>
              {itemsPerPageOptions.map(({ label, query }) => (
                <Dropdown.Item active={query === itemsPerPage.toString()}>
                  <Link href={getPath('/shopping-lists', { itemsPerPage: query, sort: sortQuery })}>
                    {label}
                  </Link>
                </Dropdown.Item>
              ))}
            </>
          </Dropdown>

          <Dropdown label={`${_tShared('_shared.sort')}: ${sortLabel}`}>
            <>
              {sortOptions.map(({ label, query }) => (
                <Dropdown.Item active={label === sortLabel}>
                  <Link
                    href={getPath('/shopping-lists', {
                      itemsPerPage: itemsPerPageQuery,
                      sort: query,
                    })}
                    class="capitalize"
                  >
                    {label}
                  </Link>
                </Dropdown.Item>
              ))}
            </>
          </Dropdown>
        </div>
      </div>

      <Tiles count={shoppingListDocs.length} noResultsMessage={_t('shoppingListsSection.noResults')}>
        <>
          {shoppingListDocs.map((shoppingListDoc) => (
            <Tiles.Item>
              <ShoppingListCard shoppingListDoc={shoppingListDoc} />
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

type SortValues = Record<keyof ShoppingListDoc, -1 | 1>;
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
