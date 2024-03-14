import { type JWTUser } from '@auth/models/user';
import { CardsSection } from '@components/sections/CardsSection';
import type { ComponentProps, Query, SortOption } from '@types';
import { $t } from '@utils/$t';
import { getItemsPerPageOption } from '@utils/getItemPerPageOption';
import { getPage } from '@utils/getPage';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';
import { getSkipValue } from '@utils/getSkipValue';
import { SortQuery, sortOptions } from '@vars';

import { ShoppingListCard } from './ShoppingListCard';
import { ShoppingList, type ShoppingListDoc } from '../models/shoppingList';

const _t = $t('shoppingLists');

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

  const { label: sortLabel, value: sortValue }: ShoppingListsSortOption = getSortOption(query.sort);
  const itemsPerPage: number = getItemsPerPageOption(query.itemsPerPage);
  const page = getPage(query.page);
  const totalShoppingListDocs = await ShoppingList.countDocuments({ author: user.id });

  const shoppingListDocs = await ShoppingList.find({ author: user.id })
    .skip(getSkipValue(page, itemsPerPage))
    .limit(itemsPerPage)
    .sort(sortValue)
    .populate('meals.meal')
    .exec();

  return (
    <CardsSection
      title={_t('shoppingListsSection.title')}
      basePath="shopping-lists"
      query={query}
      activeFilters={{ itemsPerPage, page }}
      activeSortLabel={sortLabel}
      totalCount={totalShoppingListDocs}
    >
      <>
        {shoppingListDocs.length > 0 ? (
          <CardsSection.Cards>
            <>
              {shoppingListDocs.map((shoppingListDoc) => (
                <CardsSection.Cards.Item>
                  <ShoppingListCard shoppingListDoc={shoppingListDoc} />
                </CardsSection.Cards.Item>
              ))}
            </>
          </CardsSection.Cards>
        ) : (
          <span>{_t('shoppingListsSection.noResults')}</span>
        )}
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
