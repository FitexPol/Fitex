import { icons } from 'feather-icons';

import { type JWTUser } from '@auth/models/user';
import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Switch } from '@components/inputs/Switch';
import { Link } from '@components/Link';
import { ListProducts } from '@products/components/ListProducts';
import type { ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { $tm } from '@utils/$tm';
import { getPath } from '@utils/getPath';
import { getPopulatedDoc } from '@utils/getPopulatedDoc';

import { ShoppingList } from '../models/shoppingList';
import { getProductsSum } from '../utils/getProductsSum';

const _t = $t('shoppingLists');
const _tShared = $t('_shared');

type ShoppingListSectionProps = {
  user: JWTUser;
  shoppingListId: string;
  groupByMealsQuery: string;
};

export async function ShoppingListSection({
  user,
  shoppingListId,
  groupByMealsQuery,
}: ComponentProps<ShoppingListSectionProps>) {
  const shoppingListDoc = await ShoppingList.findById(shoppingListId).populate('meals.meal').exec();

  if (!shoppingListDoc) {
    return <span>{_t('_shared.errors.notFound')}</span>;
  }

  if (!shoppingListDoc.author._id.equals(user.id)) {
    return <span>{_t('_shared.errors.permissionDenied')}</span>;
  }

  return (
    <section id="shopping-list-section">
      <Card class="relative">
        <>
          <Card.Header title={<h1 class="mb-0 pr-7 text-2xl">{shoppingListDoc.name}</h1>}>
            <Button
              class="pico-reset absolute right-4 top-4"
              hx-patch={`/api/shopping-lists/${shoppingListDoc.id}/toggle-favorite`}
              hx-target="#shopping-list-section"
              hx-swap="outerHTML"
              hx-indicator="#loader"
            >
              {icons.star.toSvg({ class: $tm(shoppingListDoc.isFavorite && 'fill-current') })}
            </Button>
          </Card.Header>

          <Link
            href={getPath(`/shopping-lists/${shoppingListDoc.id}`, {
              groupByMeals: groupByMealsQuery ? '' : 'on',
            })}
            class="contrast mb-4 self-start"
          >
            <Switch control={{ name: 'groupByMeals' }} checked={!!groupByMealsQuery}>
              <span class="mr-2">{_t('shoppingListSection.groupByMeals')}</span>
            </Switch>
          </Link>

          {groupByMealsQuery ? (
            <>
              {shoppingListDoc.meals.length > 0 &&
                shoppingListDoc.meals.map(({ meal, quantity }) => {
                  const mealDoc = getPopulatedDoc(meal);

                  return (
                    <div class="border-b-solid border-b border-b-pico-muted">
                      {mealDoc ? (
                        <>
                          <h2 class="mb-1 mt-2 text-lg">
                            <Link href={`/meals/${mealDoc.id}`}>{`${mealDoc.name} x ${quantity}`}</Link>
                          </h2>

                          <ListProducts products={mealDoc.products} />
                        </>
                      ) : (
                        <span class="mb-5 block">{_tShared('_shared.errors.population')}</span>
                      )}
                    </div>
                  );
                })}

              <ListProducts products={shoppingListDoc.products}>
                <ListProducts.Title>
                  {shoppingListDoc.meals.length > 0
                    ? _t('_shared.otherProducts')
                    : _tShared('_shared.products')}
                </ListProducts.Title>
              </ListProducts>
            </>
          ) : (
            <ListProducts products={getProductsSum(shoppingListDoc)}>
              <ListProducts.Title />
            </ListProducts>
          )}

          <Card.Footer class="flex justify-end gap-2">
            <>
              <Button
                class="!mb-0 outline"
                hx-delete={`/api/shopping-lists/${shoppingListDoc.id}`}
                hx-confirm={_t('_shared.deletionConfirmation')}
                hx-indicator="#loader"
              >
                {_tShared('_shared.delete')}
              </Button>

              <Link
                href={getPath('/shopping-lists/form', { shoppingListId: shoppingListDoc.id })}
                role="button"
              >
                {_tShared('_shared.edit')}
              </Link>
            </>
          </Card.Footer>
        </>
      </Card>
    </section>
  );
}
