import { icons } from 'feather-icons';

import { type JWTUser } from '@auth/models/user';
import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Switch } from '@components/inputs/Switch';
import { Link } from '@components/Link';
import type { ComponentProps, Product } from '@types';
import { $t } from '@utils/$t';
import { $tm } from '@utils/$tm';
import { getGroupedProducts } from '@utils/getGroupedProducts';
import { getPath } from '@utils/getPath';
import { getPopulatedDoc } from '@utils/getPopulatedDoc';

import { ShoppingList, type ShoppingListDoc } from '../models/shoppingList';

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

          {shoppingListDoc.meals.length === 0 && shoppingListDoc.products.length === 0 ? (
            <span>{_t('shoppingListSection.noMealsAndProducts')}</span>
          ) : (
            <>
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
                <GroupedByMealsProducts shoppingListDoc={shoppingListDoc} />
              ) : (
                <AllProducts shoppingListDoc={shoppingListDoc} />
              )}
            </>
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

function GroupedByMealsProducts({ shoppingListDoc }: ComponentProps<{ shoppingListDoc: ShoppingListDoc }>) {
  const { meals, products } = shoppingListDoc;

  return (
    <>
      {meals.length > 0 &&
        meals.map(({ meal, quantity }) => {
          const mealDoc = getPopulatedDoc(meal);

          return mealDoc ? (
            <>
              <Title>
                <Link href={`/meals/${mealDoc.id}`}>{`${mealDoc.name} x ${quantity}`}</Link>
              </Title>

              {mealDoc.products.length > 0 ? (
                <List>
                  <>
                    {mealDoc.products.map((product) => (
                      <Item product={product} multiplier={quantity} />
                    ))}
                  </>
                </List>
              ) : (
                <span>{_t('shoppingListSection.noMealProducts')}</span>
              )}
            </>
          ) : (
            <span class="mb-5 block">{_tShared('_shared.errors.population')}</span>
          );
        })}

      {products.length > 0 && (
        <>
          <Title>{_t('_shared.products')}</Title>

          <List>
            <>
              {products.map((product) => (
                <Item product={product} />
              ))}
            </>
          </List>
        </>
      )}
    </>
  );
}

function AllProducts({ shoppingListDoc }: ComponentProps<{ shoppingListDoc: ShoppingListDoc }>) {
  const { meals, products } = shoppingListDoc;
  const productsArray: Product[] = [];

  if (meals.length > 0) {
    meals.forEach(({ meal, quantity: mealQuantity }) => {
      const mealDoc = getPopulatedDoc(meal);

      if (!mealDoc) return;

      mealDoc.products.forEach((product) => {
        productsArray.push({
          name: product.name,
          quantity: product.quantity * mealQuantity,
          unit: product.unit,
        });
      });
    });
  }

  if (products.length > 0) {
    productsArray.push(...products);
  }

  const allProducts = getGroupedProducts(productsArray);

  return (
    <>
      {allProducts.length > 0 ? (
        <>
          <Title>{_t('shoppingListSection.allProducts')}</Title>

          <List>
            <>
              {allProducts.map((product) => (
                <Item product={product} />
              ))}
            </>
          </List>
        </>
      ) : (
        <span>{_t('shoppingListSection.noProducts')}</span>
      )}
    </>
  );
}

function Title({ children }: ComponentProps) {
  return <h3 class="mb-1 mt-2 text-lg">{children}:</h3>;
}

function List({ children }: ComponentProps) {
  return <ul>{children}</ul>;
}

type ListItemProps = {
  product: Product;
  multiplier?: number;
};

function Item({ product, multiplier }: ComponentProps<ListItemProps>) {
  const finalQuantity = multiplier ? product.quantity * multiplier : product.quantity;

  return (
    <li>
      <label>
        <input type="checkbox" name={product.name} />
        {product.name} - {finalQuantity} {product.unit}
      </label>
    </li>
  );
}
