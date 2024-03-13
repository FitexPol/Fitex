import { icons } from 'feather-icons';

import { type JWTUser } from '@auth/models/user';
import { Dropdown } from '@components/Dropdown';
import { Link } from '@components/Link';
import { Pagination } from '@components/Pagination';
import { Tiles } from '@components/Tiles';
import type { ComponentProps, SortOption } from '@types';
import { $t } from '@utils/$t';
import { getItemsPerPageOption } from '@utils/getItemPerPageOption';
import { getPage } from '@utils/getPage';
import { getPath } from '@utils/getPath';
import { getSkipValue } from '@utils/getSkipValue';
import { SortQuery, itemsPerPageOptions, sortOptions } from '@vars';

import { MealCard } from './MealCard';
import { Meal, type MealDoc } from '../models/meal';

const _t = $t('meals');
const _tShared = $t('_shared');

type MealsSectionProps = {
  user: JWTUser;
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
      <div class="mb-6 flex flex-col items-start justify-between gap-y-5 md:flex-row lg:items-center">
        <div class="flex items-center gap-2">
          <h1 class="mb-0 text-xl">{_t('mealsSection.title')}</h1>
          <Link href="/meals/basic-information-form">{icons['plus-circle'].toSvg()}</Link>
        </div>

        <div class="flex flex-col gap-2 lg:flex-row">
          <Dropdown label={`${_tShared('_shared.itemsPerPage')}: ${itemsPerPage}`}>
            <>
              {itemsPerPageOptions.map(({ label, query }) => (
                <Dropdown.Item active={query === itemsPerPage.toString()}>
                  <Link href={getPath('/meals', { itemsPerPage: query, sort: sortQuery })}>{label}</Link>
                </Dropdown.Item>
              ))}
            </>
          </Dropdown>

          <Dropdown label={`${_tShared('_shared.sort')}: ${sortLabel}`}>
            <>
              {sortOptions.map(({ label, query }) => (
                <Dropdown.Item active={label === sortLabel}>
                  <Link
                    href={getPath('/meals', {
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

      <Tiles count={mealDocs.length} noResultsMessage={_t('mealsSection.noResults')}>
        <>
          {mealDocs.map((mealDoc) => (
            <Tiles.Item>
              <MealCard mealDoc={mealDoc} />
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
