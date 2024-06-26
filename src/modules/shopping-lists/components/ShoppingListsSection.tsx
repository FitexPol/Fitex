import { type JWTUser } from '@auth/models/user';
import { ListSection } from '@components/sections/ListSection';
import type { Query, SortOption } from '@types';
import { $t } from '@utils/$t';
import { getItemsPerPageOption } from '@utils/pagination/getItemPerPageOption';
import { getPage } from '@utils/pagination/getPage';
import { getSkipValue } from '@utils/pagination/getSkipValue';
import { SortQuery, type listPageQuery, sortOptions } from '@vars';

import { ShoppingList, type ShoppingListDoc } from '../models/shoppingList';

type ShoppingListsSectionProps = {
  user: JWTUser;
  query: Query<typeof listPageQuery>;
};

export async function ShoppingListsSection({ user, query }: ShoppingListsSectionProps) {
  const { label: sortLabel, value: sortValue }: ShoppingListsSortOption = getSortOption(query.sort);
  const itemsPerPage: number = getItemsPerPageOption(query.itemsPerPage);
  const page = getPage(query.page);
  const totalShoppingListDocs = await ShoppingList.countDocuments({ author: user.id });

  const shoppingListDocs = await ShoppingList.find({ author: user.id })
    .skip(getSkipValue(page, itemsPerPage))
    .limit(itemsPerPage)
    .sort(sortValue)
    .exec();

  return (
    <ListSection
      title={$t('shoppingLists.shoppingListsSection.title')}
      basePath="shopping-lists"
      query={query}
      activeFilters={{ itemsPerPage, page }}
      activeSortLabel={sortLabel}
      totalCount={totalShoppingListDocs}
    >
      {shoppingListDocs.map((shoppingListDoc) => (
        <ListSection.Item basePath="shopping-lists" entity={shoppingListDoc} />
      ))}
    </ListSection>
  );
}

type SortValues = Record<keyof ShoppingListDoc, -1 | 1>;
type ShoppingListsSortOption = SortOption<Pick<SortValues, 'name'> | Pick<SortValues, 'creationDate'>>;

function getSortOption(queryParam?: string): ShoppingListsSortOption {
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
