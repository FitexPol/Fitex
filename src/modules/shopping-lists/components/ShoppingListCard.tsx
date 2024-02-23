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
  shoppingList: ShoppingListDoc;
};

export function ShoppingListCard({ shoppingList }: ComponentProps<ShoppingListCardProps>) {
  return (
    <Card class="group relative m-0 h-full max-h-72 p-5 pt-10">
      <>
        <div class="invisible absolute left-0 top-0 flex gap-2 px-2 py-2 group-hover:visible">
          <Link href={getPath('/shopping-lists/form', { shoppingListId: shoppingList.id })}>
            {icons.edit.toSvg()}
          </Link>

          <Button
            class="w-auto border-none px-0"
            hx-delete={`/api/shopping-lists/${shoppingList.id}`}
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
            shoppingList.isFavorite ? 'visible' : 'invisible group-hover:visible',
          )}
          hx-patch={`/api/shopping-lists/${shoppingList.id}/toggle-favorite`}
          hx-target="closest section"
          hx-swap="outerHTML"
          hx-indicator="#loader"
        >
          {icons.star.toSvg({ class: $tm(shoppingList.isFavorite && 'fill-current') })}
        </Button>

        <Link
          href={getPath(`/shopping-lists/${shoppingList.id}`, { groupByMeals: 'on' })}
          class="flex h-full flex-col items-stretch gap-y-2 overflow-y-auto border-none text-start"
        >
          <>
            <h2 class="mb-auto text-lg font-medium">{shoppingList.name}</h2>

            {shoppingList.meals.length > 0 && (
              <List title={_t('_shared.meals')}>
                <>
                  {shoppingList.meals.map(({ meal, quantity }) => {
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

            {shoppingList.additionalIngredients.length > 0 && (
              <List title={_t('_shared.additionalIngredients')}>
                <>
                  {shoppingList.additionalIngredients.map(({ name, quantity, unit }) => (
                    <ListItem>
                      <>
                        <span>{_tShared(`_shared.ingredients.${name}`)}</span>
                        <span>
                          {quantity} {unit}
                        </span>
                      </>
                    </ListItem>
                  ))}
                </>
              </List>
            )}
          </>
        </Link>
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
      <h3 class="mb-1 text-sm">{title}:</h3>
      <ul class="mt-auto pl-4">{children}</ul>
    </div>
  );
}

function ListItem({ children }: ComponentProps) {
  return <li class="flex justify-between text-xs font-light">{children}</li>;
}
