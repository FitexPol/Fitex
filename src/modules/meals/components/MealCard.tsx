import { icons } from 'feather-icons';

import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Link } from '@components/Link';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { $tm } from '@utils/$tm';
import { getPath } from '@utils/getPath';
import { getPopulatedDoc } from '@utils/getPopulatedDoc';

import { type MealDoc } from '../models/meal';

const _t = $t('meals');
const _tShared = $t('_shared');

type MealCard = {
  mealDoc: MealDoc;
};

export function MealCard({ mealDoc }: ComponentProps<MealCard>) {
  return (
    <Card class="group relative h-full">
      <>
        <Card.Header title={<h3 class="mb-0 pr-7 text-lg">{mealDoc.name}</h3>}>
          <Button
            class={$tm(
              'pico-reset absolute right-4 top-3.5',
              mealDoc.isFavorite ? 'visible' : 'invisible group-hover:visible',
            )}
            hx-patch={`/api/meals/${mealDoc.id}/toggle-favorite`}
            hx-target="closest section"
            hx-swap="outerHTML"
            hx-indicator="#loader"
          >
            {icons.star.toSvg({ class: $tm(mealDoc.isFavorite && 'fill-current') })}
          </Button>
        </Card.Header>

        <Link href={`/meals/${mealDoc.id}`} class="contrast flex-grow">
          <>
            {mealDoc.products.length > 0 && (
              <ul>
                {mealDoc.products.map(({ product, quantity, unit }) => {
                  const productDoc = getPopulatedDoc(product);

                  return (
                    <li class="flex justify-between text-xs">
                      <span>
                        {productDoc ? productDoc.name['pl-PL'] : _tShared(`_shared.errors.population`)}
                      </span>
                      <span>
                        {quantity} {unit}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        </Link>

        <Card.Footer class="flex justify-end gap-2">
          <>
            <Button
              class="pico-reset !text-inherit"
              hx-delete={`/api/meals/${mealDoc.id}`}
              hx-target="closest section"
              hx-swap="outerHTML"
              hx-confirm={_t('_shared.deletionConfirmation')}
              hx-indicator="#loader"
            >
              {icons.trash.toSvg()}
            </Button>

            <Link href={getPath('/meals/form', { mealId: mealDoc.id })}>{icons.edit.toSvg()}</Link>
          </>
        </Card.Footer>
      </>
    </Card>
  );
}
