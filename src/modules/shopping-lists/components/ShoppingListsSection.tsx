import { type JWTUser } from '@auth/models/user';
import { CardsSection } from '@components/sections/CardsSection';
import type { ComponentProps, Query, SortOption } from '@types';
import { $t } from '@utils/$t';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';
import { getItemsPerPageOption } from '@utils/pagination/getItemPerPageOption';
import { getPage } from '@utils/pagination/getPage';
import { getSkipValue } from '@utils/pagination/getSkipValue';
import { SortQuery, sortOptions } from '@vars';

import { ShoppingList, type ShoppingListDoc } from '../models/shoppingList';

type ShoppingListsSectionProps = {
  user: JWTUser;
  query: Query;
};

export async function ShoppingListsSection({ user, query: q }: ComponentProps<ShoppingListsSectionProps>) {
  const query = {
    sort: getQueryParamSecure(q.sort),
    itemsPerPage: getQueryParamSecure(q.itemsPerPage),
    page: getQueryParamSecure(q.page),
  };

  const basePath = 'shopping-lists';
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
    <CardsSection
      title={$t('shoppingLists.shoppingListsSection.title')}
      basePath={basePath}
      query={query}
      activeFilters={{ itemsPerPage, page }}
      activeSortLabel={sortLabel}
      totalCount={totalShoppingListDocs}
    >
      <>
        {shoppingListDocs.map((shoppingListDoc) => (
          <CardsSection.Item entity={shoppingListDoc} basePath={basePath} />
        ))}
      </>
    </CardsSection>
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
