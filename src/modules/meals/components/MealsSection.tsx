import { type User } from '@auth/models/user';
import { Dropdown } from '@components/Dropdown';
import { type ComponentProps } from '@types';

import { AddMealCard } from './AddMealCard';
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

type MealsSectionProps = {
  user: User;
  sortQuery: string;
};

export async function MealsSection({ user, sortQuery }: ComponentProps<MealsSectionProps>) {
  const { label, value } = getSortOption(sortQuery);
  const mealDocs = await Meal.find({ author: user.id }).sort(value).exec();

  return (
    <section id="meals-section">
      <div class="mb-4 flex justify-between">
        <h1>Your meals</h1>

        <Dropdown label={`Sort ${label}`}>
          <>
            {sortOptions.map(({ label, query }) => (
              <Dropdown.Item>
                <a hx-boost="true" href={`/meals?sort=${query}`} class="capitalize">
                  {label}
                </a>
              </Dropdown.Item>
            ))}
          </>
        </Dropdown>
      </div>

      <ul class="grid grid-cols-4 gap-2 xl:grid-cols-5">
        <li>
          <AddMealCard />
        </li>

        {mealDocs.map((mealDoc) => (
          <li>
            <MealCard meal={mealDoc} />
          </li>
        ))}
      </ul>
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
