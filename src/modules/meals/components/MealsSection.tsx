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
import { SortQuery, itemsPerPageOptions, sortOptions } from '@vars';

import { MealCard } from './MealCard';
import { Meal } from '../models/meal';

const _t = $t('meals');
const _tShared = $t('_shared');

type MealsSectionProps = {
  user: User;
  sortQuery: string;
  itemsPerPageQuery: string;
  pageQuery: string;
};

export async function MealsSection({
  user,
  sortQuery,
  itemsPerPageQuery,
  pageQuery,
}: ComponentProps<MealsSectionProps>) {
  const { label: sortLabel, value: sortValue }: MealsSortOption = getSortOption(sortQuery);
  const itemsPerPage: number = getItemsPerPageOption(itemsPerPageQuery);
  const page = getPage(pageQuery);
  const totalMealDocs = await Meal.countDocuments({ author: user.id });

  const mealDocs = await Meal.find({ author: user.id })
    .skip(getSkipValue(page, itemsPerPage))
    .limit(itemsPerPage)
    .sort(sortValue)
    .exec();

  return (
    <section id="meals-section">
      <div class="mb-6 flex justify-between">
        <div class="flex items-center gap-2">
          <h1>{_t('mealsSection.title')}</h1>
          <a href="/meals/form" hx-indicator="#loader" hx-boost="true">
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
                    href={getPath('/meals', { itemsPerPage: query, sort: sortQuery })}
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
                    href={getPath('/meals', {
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

      <Tiles count={mealDocs.length} noResultsMessage={_t('mealsSection.noResults')}>
        <>
          {mealDocs.map((mealDoc) => (
            <Tiles.Item>
              <MealCard meal={mealDoc} />
            </Tiles.Item>
          ))}
        </>
      </Tiles>

      <Pagination
        itemsPerPage={itemsPerPage}
        page={page}
        totalCount={totalMealDocs}
        path="/meals"
        currentQuery={{ sort: sortQuery, itemsPerPage: itemsPerPageQuery }}
      />
    </section>
  );
}

type SortValues = Record<keyof Meal, -1 | 1>;
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
