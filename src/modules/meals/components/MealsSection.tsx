import { icons } from 'feather-icons';

import { type User } from '@auth/models/user';
import { Button } from '@components/Button';
import { Dropdown } from '@components/Dropdown';
import { Pagination } from '@components/Pagination';
import { type ComponentProps } from '@types';
import { getPath } from '@utils/getPath';

import { MealCard } from './MealCard';
import { Meal } from '../models/meal';

enum SortLabel {
  NameAsc = 'by name - ASC',
  NameDesc = 'by name - DESC',
  CreationDateAsc = 'by creation date - ASC',
  CreationDateDesc = 'by creation date - DESC',
}

enum SortQuery {
  NameAsc = 'name-asc',
  NameDesc = 'name-desc',
  CreationDateAsc = 'creationDate-asc',
  CreationDateDesc = 'creationDate-desc',
}

const sortOptions = [
  { label: SortLabel.NameAsc, query: SortQuery.NameAsc },
  { label: SortLabel.NameDesc, query: SortQuery.NameDesc },
  { label: SortLabel.CreationDateAsc, query: SortQuery.CreationDateAsc },
  { label: SortLabel.CreationDateDesc, query: SortQuery.CreationDateDesc },
];

enum ItemsPerPage {
  _15 = '15',
  _30 = '30',
  _60 = '60',
}

const itemsPerPageOptions = [
  { label: ItemsPerPage._15, query: ItemsPerPage._15 },
  { label: ItemsPerPage._30, query: ItemsPerPage._30 },
  { label: ItemsPerPage._60, query: ItemsPerPage._60 },
];

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
  const { label: sortLabel, value: sortValue }: SortOption = getSortOption(sortQuery);
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
          <h1>Your meals</h1>
          <Button
            class="w-auto border-none p-0"
            hx-get="/api/meals/modal"
            hx-target="#modal-portal"
            hx-indicator="#loader"
          >
            {icons['plus-circle'].toSvg()}
          </Button>
        </div>

        <div class="flex gap-2">
          <Dropdown label={`Items per page: ${itemsPerPage}`}>
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

          <Dropdown label={`Sort: ${sortLabel}`}>
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

      <ul class="grid grid-cols-4 gap-2 xl:grid-cols-5">
        {mealDocs.map((mealDoc) => (
          <li>
            <MealCard meal={mealDoc} />
          </li>
        ))}
      </ul>

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

type SortOption = {
  label: SortLabel;
  value: Pick<SortValues, 'name'> | Pick<SortValues, 'creationDate'>;
};

function getSortOption(queryParam: string): SortOption {
  switch (queryParam) {
    case SortQuery.NameAsc:
      return {
        label: SortLabel.NameAsc,
        value: { name: 1 },
      };
    case SortQuery.NameDesc:
      return {
        label: SortLabel.NameDesc,
        value: { name: -1 },
      };
    case SortQuery.CreationDateAsc:
      return {
        label: SortLabel.CreationDateAsc,
        value: { creationDate: 1 },
      };
    default:
      return {
        label: SortLabel.CreationDateDesc,
        value: { creationDate: -1 },
      };
  }
}

function getItemsPerPageOption(queryParam: string): number {
  switch (queryParam) {
    case ItemsPerPage._30:
      return Number(ItemsPerPage._30);
    case ItemsPerPage._60:
      return Number(ItemsPerPage._60);
    default:
      return Number(ItemsPerPage._15);
  }
}

function getSkipValue(page: number, itemsPerPage: number): number {
  return (page - 1) * itemsPerPage;
}

function getPage(pageQuery: string) {
  let page = 1;

  if (pageQuery) {
    const parsed = Number(pageQuery);

    if (!isNaN(parsed)) {
      page = parsed;
    }
  }

  if (page < 1) {
    page = 1;
  }

  return page;
}
