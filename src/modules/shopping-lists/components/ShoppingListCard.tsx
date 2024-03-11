import { icons } from 'feather-icons';

import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Link } from '@components/Link';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { $tm } from '@utils/$tm';
import { getPath } from '@utils/getPath';
import { getPopulatedDoc } from '@utils/getPopulatedDoc';
import { getRoundedQuantity } from '@utils/getRoundedQuantity';

import { type ShoppingListDoc } from '../models/shoppingList';
import { getProductsSum } from '../utils/getProductsSum';

const _t = $t('shoppingLists');

type ShoppingListCardProps = {
  shoppingListDoc: ShoppingListDoc;
};

export function ShoppingListCard({ shoppingListDoc }: ComponentProps<ShoppingListCardProps>) {
  const allProducts = getProductsSum(shoppingListDoc);

  const meals = shoppingListDoc.meals.reduce((acc, { meal, quantity }) => {
    const mealDoc = getPopulatedDoc(meal);

    if (!mealDoc) return acc;

    const text = quantity > 1 ? `${mealDoc.name} (x${quantity})` : mealDoc.name;

    return acc.length > 0 ? `${acc}, ${text}` : text;
  }, '');

  return (
    <Card class="group relative h-full">
      <>
        <Card.Header title={<h3 class="mb-0 pr-7 text-lg">{shoppingListDoc.name}</h3>}>
          <Button
            class={$tm(
              'pico-reset absolute right-4 top-3.5',
              shoppingListDoc.isFavorite ? 'visible' : 'invisible group-hover:visible',
            )}
            hx-patch={`/api/shopping-lists/${shoppingListDoc.id}/toggle-favorite`}
            hx-target="closest section"
            hx-swap="outerHTML"
            hx-indicator="#loader"
          >
            {icons.star.toSvg({ class: $tm(shoppingListDoc.isFavorite && 'fill-current') })}
          </Button>
        </Card.Header>

        <Link
          href={getPath(`/shopping-lists/${shoppingListDoc.id}`, { groupByMeals: 'on' })}
          class="contrast flex-grow"
        >
          <>
            <h4 class="mb-2 text-sm">{_t('_shared.products')}:</h4>

            <ul>
              {allProducts.length > 0 ? (
                allProducts.map((product) => (
                  <li class="flex justify-between text-xs">
                    <span>{product.name}</span>
                    <span>{getRoundedQuantity(product.quantity)}</span>
                  </li>
                ))
              ) : (
                <span>{_t('_shared.noProducts')}</span>
              )}
            </ul>

            {meals && (
              <small class="text-xs">
                * {_t('shoppingListCard.includedMeals')}: {meals}
              </small>
            )}
          </>
        </Link>

        <Card.Footer class="flex justify-end gap-2">
          <>
            <Button
              class="pico-reset !text-inherit"
              hx-delete={`/api/shopping-lists/${shoppingListDoc.id}`}
              hx-target="closest section"
              hx-swap="outerHTML"
              hx-confirm={_t('_shared.deletionConfirmation')}
              hx-indicator="#loader"
            >
              {icons.trash.toSvg()}
            </Button>

            <Link href={getPath('/shopping-lists/form', { shoppingListId: shoppingListDoc.id })}>
              {icons.edit.toSvg()}
            </Link>
          </>
        </Card.Footer>
      </>
    </Card>
  );
}
