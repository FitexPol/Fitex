import { icons } from 'feather-icons';

import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Link } from '@components/Link';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { $tm } from '@utils/$tm';
import { getPath } from '@utils/getPath';

import { type MealDoc } from '../models/meal';

const _t = $t('meals');
const _tShared = $t('_shared');

type MealCard = {
  meal: MealDoc;
};

export function MealCard({ meal }: ComponentProps<MealCard>) {
  return (
    <Card class="group relative m-0 h-full max-h-72 p-5 pt-10">
      <>
        <div class="invisible absolute left-0 top-0 flex gap-2 px-2 py-2 group-hover:visible">
          <Link href={getPath('/meals/form', { mealId: meal.id })}>{icons.edit.toSvg()}</Link>

          <Button
            class="w-auto border-none px-0"
            hx-delete={`/api/meals/${meal.id}`}
            hx-target="closest section"
            hx-swap="outerHTML"
            hx-confirm={_t('_shared.deletionConfirmation')}
            hx-indicator="#loader"
          >
            {icons.trash.toSvg()}
          </Button>
        </div>

        <Button
          class={$tm(
            'absolute right-2 top-2 mr-auto w-auto border-none px-0',
            meal.isFavorite ? 'visible' : 'invisible group-hover:visible',
          )}
          hx-patch={`/api/meals/${meal.id}/toggle-favorite`}
          hx-target="closest section"
          hx-swap="outerHTML"
          hx-indicator="#loader"
        >
          {icons.star.toSvg({ class: $tm(meal.isFavorite && 'fill-current') })}
        </Button>

        <Link
          href={`/meals/${meal.id}`}
          class="flex h-full flex-col items-stretch gap-y-2 overflow-y-auto border-none text-start"
        >
          <>
            <h2 class="text-lg font-medium">{meal.name}</h2>

            {meal.ingredients.length > 0 && (
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
            )}
          </>
        </Link>
      </>
    </Card>
  );
}
