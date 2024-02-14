import { icons } from 'feather-icons';

import { Button } from '@components/Button';
import { type ComponentProps } from '@types';

import { type Meal } from '../models/meal';

type MealCard = {
  meal: Meal;
};

export function MealCard({ meal }: ComponentProps<MealCard>) {
  return (
    <article class="group relative m-0 h-full max-h-72 py-10">
      <Button
        class="flex h-full flex-col items-stretch gap-y-2 overflow-y-auto border-none text-start"
        hx-get={`/api/meals/modal?mealId=${meal.id}`}
        hx-target="#modal-portal"
      >
        <>
          <h3 class="text-lg font-medium">{meal.name}</h3>
          {!!meal.description && <p class="text-sm">{meal.description}</p>}

          <ul class="mt-auto">
            {meal.ingredients.map(({ name, quantity, unit }) => (
              <li class="flex justify-between text-xs font-light">
                <span>{name}</span>
                <span>{`${quantity}${unit}`}</span>
              </li>
            ))}
          </ul>
        </>
      </Button>

      <Button
        class="invisible absolute right-2 top-2 w-auto border-none group-hover:visible"
        hx-delete={`/api/meals/${meal.id}`}
        hx-target="#meals-section"
        hx-swap="outerHTML"
        hx-confirm="Are you sure you want to delete this meal? This action cannot be undone."
      >
        {icons.trash.toSvg()}
      </Button>
    </article>
  );
}
