import { icons } from 'feather-icons';

import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Link } from '@components/Link';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { $tm } from '@utils/$tm';
import { getPath } from '@utils/getPath';
import { getPopulatedDoc } from '@utils/getPopulatedDoc';

import { type ShoppingListDoc } from '../models/shoppingList';

const _t = $t('shoppingLists');
const _tShared = $t('_shared');

type ShoppingListCardProps = {
  shoppingListDoc: ShoppingListDoc;
};

export function ShoppingListCard({ shoppingListDoc }: ComponentProps<ShoppingListCardProps>) {
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
            {shoppingListDoc.meals.length > 0 && (
              <List title={_t('_shared.meals')}>
                <>
                  {shoppingListDoc.meals.map(({ meal, quantity }) => {
                    const mealDoc = getPopulatedDoc(meal);

                    return (
                      <ListItem>
                        <>
                          <span>{mealDoc?.name ?? _tShared('_shared.errors.population')}</span>
                          <span>x {quantity}</span>
                        </>
                      </ListItem>
                    );
                  })}
                </>
              </List>
            )}

            {shoppingListDoc.products.length > 0 && (
              <List title={_t('_shared.products')}>
                <>
                  {shoppingListDoc.products.map(({ product, quantity, unit }) => {
                    const productDoc = getPopulatedDoc(product);

                    return (
                      <ListItem>
                        <>
                          <span>
                            {productDoc ? productDoc.name['pl-PL'] : _tShared('_shared.errors.population')}
                          </span>
                          <span>
                            {quantity} {unit}
                          </span>
                        </>
                      </ListItem>
                    );
                  })}
                </>
              </List>
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

type ListProps = {
  title: string;
};

function List({ title, children }: ComponentProps<ListProps>) {
  return (
    <div>
      <h4 class="mb-2 text-sm">{title}:</h4>
      <ul>{children}</ul>
    </div>
  );
}

function ListItem({ children }: ComponentProps) {
  return <li class="flex justify-between text-xs">{children}</li>;
}
