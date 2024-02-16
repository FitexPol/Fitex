import { icons } from 'feather-icons';

import { Button } from '@components/Button';
import { type ComponentProps } from '@types';
import { getPath } from '@utils/getPath';

import { type Meal } from '../models/meal';

type MealCard = {
  meal: Meal;
};

export function MealCard({ meal }: ComponentProps<MealCard>) {
  return (
    <article class="group relative m-0 h-full max-h-72 py-10" hx-boost="true">
      <a
        href={`/meal/${meal.id}`}
        class="flex h-full flex-col items-stretch gap-y-2 overflow-y-auto border-none text-start"
        hx-indicator="#loader"
      >
        <>
          <h3 class="text-lg font-medium">{meal.name}</h3>

          <ul class="mt-auto">
            {meal.ingredients.map(({ name, quantity, unit }) => (
              <li class="flex justify-between text-xs font-light">
                <span>{name}</span>
                <span>
                  {quantity} {unit}
                </span>
              </li>
            ))}
          </ul>
        </>
      </a>

      <div class="invisible absolute right-2 top-2 flex gap-2 group-hover:visible">
        <Button
          class="w-auto border-none px-0"
          hx-get={getPath('/api/meals/modal', { mealId: meal.id.toString() })}
          hx-target="#modal-portal"
          hx-indicator="#loader"
        >
          {icons.edit.toSvg()}
        </Button>

        <Button
          class="w-auto border-none px-0"
          hx-delete={`/api/meals/${meal.id}`}
          hx-target="#meals-section"
          hx-swap="outerHTML"
          hx-confirm="Are you sure you want to delete this meal? This action cannot be undone."
        >
          {icons.trash.toSvg()}
        </Button>
      </div>
    </article>
  );
}
