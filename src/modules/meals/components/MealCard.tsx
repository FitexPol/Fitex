import { icons } from 'feather-icons';

import { Button } from '@components/Button';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { $tm } from '@utils/$tm';
import { getPath } from '@utils/getPath';

import { type Meal } from '../models/meal';

const _t = $t('meals');

type MealCard = {
  meal: Meal;
};

export function MealCard({ meal }: ComponentProps<MealCard>) {
  return (
    <article class="group relative m-0 h-full max-h-72 py-10" hx-boost="true">
      <Button
        class={$tm(
          'absolute left-2 top-2 mr-auto w-auto border-none px-0',
          meal.isFavorite ? 'visible' : 'invisible group-hover:visible',
        )}
        hx-patch={`/api/meals/${meal.id}/toggle-favorite`}
        hx-target="closest section"
        hx-swap="outerHTML"
        hx-indicator="#loader"
      >
        {icons.star.toSvg({ class: $tm(meal.isFavorite && 'fill-current') })}
      </Button>

      <div class="invisible absolute right-0 top-0 flex gap-2 px-2 py-2 group-hover:visible">
        <Button
          class="w-auto border-none px-0"
          hx-get={getPath('/api/meals/modal', { mealId: meal.id })}
          hx-target="#modal-portal"
          hx-indicator="#loader"
        >
          {icons.edit.toSvg()}
        </Button>

        <Button
          class="w-auto border-none px-0"
          hx-delete={`/api/meals/${meal.id}`}
          hx-target="closest section"
          hx-swap="outerHTML"
          hx-confirm={_t('_shared.deletionConfirmation')}
        >
          {icons.trash.toSvg()}
        </Button>
      </div>

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
                <span>{_t(`mealForm.ingredients.options.${name}`)}</span>
                <span>
                  {quantity} {unit}
                </span>
              </li>
            ))}
          </ul>
        </>
      </a>
    </article>
  );
}
