import { icons } from 'feather-icons';

import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { $tm } from '@utils/$tm';
import { getPath } from '@utils/getPath';

import { type Meal } from '../models/meal';

const _t = $t('meals');
const _tShared = $t('_shared');

type MealCard = {
  meal: Meal;
};

export function MealCard({ meal }: ComponentProps<MealCard>) {
  return (
    <Card class="group relative m-0 h-full max-h-72 p-5 pt-10">
      <>
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
          <a href={getPath('/meals/form', { mealId: meal.id })} hx-indicator="#loader" hx-boost="true">
            {icons.edit.toSvg()}
          </a>

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
          href={`/meals/${meal.id}`}
          class="flex h-full flex-col items-stretch gap-y-2 overflow-y-auto border-none text-start"
          hx-indicator="#loader"
          hx-boost="true"
        >
          <>
            <h3 class="text-lg font-medium">{meal.name}</h3>

            <ul class="mt-auto">
              {meal.ingredients.map(({ name, quantity, unit }) => (
                <li class="flex justify-between text-xs font-light">
                  <span>{_tShared(`_shared.ingredients.${name}`)}</span>
                  <span>
                    {quantity} {unit}
                  </span>
                </li>
              ))}
            </ul>
          </>
        </a>
      </>
    </Card>
  );
}
