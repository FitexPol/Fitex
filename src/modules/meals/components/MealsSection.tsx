import { type JWTUser } from '@auth/models/user';
import { CardsSection } from '@components/sections/CardsSection';
import type { ComponentProps, Query, SortOption } from '@types';
import { $t } from '@utils/$t';
import { getItemsPerPageOption } from '@utils/getItemPerPageOption';
import { getPage } from '@utils/getPage';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';
import { getSkipValue } from '@utils/getSkipValue';
import { SortQuery, sortOptions } from '@vars';

import { MealCard } from './MealCard';
import { Meal, type MealDoc } from '../models/meal';

const _t = $t('meals');

type MealsSectionProps = {
  user: JWTUser;
  query: Query;
};

export async function MealsSection({ user, query: q }: ComponentProps<MealsSectionProps>) {
  const query = {
    sort: getQueryParamSecure(q.sort),
    itemsPerPage: getQueryParamSecure(q.itemsPerPage),
    page: getQueryParamSecure(q.page),
  };

  const { label: sortLabel, value: sortValue }: MealsSortOption = getSortOption(query.sort);
  const itemsPerPage: number = getItemsPerPageOption(query.itemsPerPage);
  const page = getPage(query.page);

  const totalMealDocs = await Meal.countDocuments({ author: user!.id });

  const mealDocs = await Meal.find({ author: user!.id })
    .skip(getSkipValue(page, itemsPerPage))
    .limit(itemsPerPage)
    .sort(sortValue)
    .exec();

  return (
    <CardsSection
      title={_t('mealsSection.title')}
      basePath="meals"
      query={query}
      activeFilters={{ itemsPerPage, page }}
      activeSortLabel={sortLabel}
      totalCount={totalMealDocs}
    >
      <>
        {mealDocs.length > 0 ? (
          <CardsSection.Cards>
            <>
              {mealDocs.map((mealDoc) => (
                <CardsSection.Cards.Item>
                  <MealCard mealDoc={mealDoc} />
                </CardsSection.Cards.Item>
              ))}
            </>
          </CardsSection.Cards>
        ) : (
          <span>{_t('mealsSection.noResults')}</span>
        )}
      </>
    </CardsSection>
  );
}

type SortValues = Record<keyof MealDoc, -1 | 1>;
type MealsSortOption = SortOption<Pick<SortValues, 'name'> | Pick<SortValues, 'creationDate'>>;

function getSortOption(queryParam: string): MealsSortOption {
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
