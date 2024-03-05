import { icons } from 'feather-icons';

import { type JWTUser } from '@auth/models/user';
import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Switch } from '@components/inputs/Switch';
import { Link } from '@components/Link';
import { type ProductDoc } from '@products/models/product';
import type { ComponentProps, Populated } from '@types';
import { $t } from '@utils/$t';
import { $tm } from '@utils/$tm';
import { getPath } from '@utils/getPath';
import { getPopulatedDoc } from '@utils/getPopulatedDoc';
import { type Unit } from '@vars';

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
  const shoppingListDoc = await ShoppingList.findById(shoppingListId)
    .populate({
      path: 'meals.meal',
      populate: {
        path: 'products.product',
        populate: { path: 'category' },
      },
    })
    .populate('products.product')
    .populate({
      path: 'products.product',
      populate: { path: 'category' },
    })
    .exec();

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
                    {mealDoc.products.map(({ product, quantity: productQuantity, unit }) => {
                      const productDoc = getPopulatedDoc(product);

                      return productDoc ? (
                        <Item
                          productDoc={productDoc}
                          quantity={productQuantity}
                          unit={unit}
                          multiplier={quantity}
                        />
                      ) : (
                        <li>
                          <span>{_tShared('_shared.errors.population')}</span>
                        </li>
                      );
                    })}
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
              {products.map(({ product, quantity, unit }) => {
                const productDoc = getPopulatedDoc(product);

                return productDoc ? (
                  <Item productDoc={productDoc} quantity={quantity} unit={unit} />
                ) : (
                  <li>
                    <span>{_tShared('_shared.errors.population')}</span>
                  </li>
                );
              })}
            </>
          </List>
        </>
      )}
    </>
  );
}

function AllProducts({ shoppingListDoc }: ComponentProps<{ shoppingListDoc: ShoppingListDoc }>) {
  const { meals, products } = shoppingListDoc;
  const map = new Map<string, Record<string, { productDoc: ProductDoc; quantity: number; unit: Unit }>>();

  if (meals.length > 0) {
    meals.forEach(({ meal, quantity }) => {
      const mealDoc = getPopulatedDoc(meal);

      if (!mealDoc) return;

      mapProducts(mealDoc.products, quantity);
    });
  }

  if (products.length > 0) mapProducts(products);

  function mapProducts(
    products: { product: Populated<ProductDoc>; quantity: number; unit: Unit }[],
    multiplier = 1,
  ) {
    products.forEach(({ product, quantity: productQuantity, unit }) => {
      const productDoc = getPopulatedDoc(product);

      if (!productDoc) return;

      const categoryDoc = getPopulatedDoc(productDoc.category);
      const mapKey = categoryDoc ? categoryDoc.name['pl-PL'] : 'NO_CATEGORY';

      if (!map.has(mapKey)) map.set(mapKey, {});

      const products = map.get(mapKey)!;
      const productKey = `${productDoc.id}.${unit}`;

      products[productKey]
        ? (products[productKey].quantity += productQuantity * multiplier)
        : (products[productKey] = { productDoc, quantity: productQuantity * multiplier, unit });
    });
  }

  return (
    <>
      {map.size > 0 ? (
        Array.from(map).map(([category, products]) => {
          return (
            <>
              <Title>{category}</Title>

              <List>
                <>
                  {Object.values(products).map(({ productDoc, quantity, unit }) => (
                    <Item productDoc={productDoc} quantity={quantity} unit={unit} />
                  ))}
                </>
              </List>
            </>
          );
        })
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
  productDoc: ProductDoc;
  quantity: number;
  unit: Unit;
  multiplier?: number;
};

function Item({ productDoc, quantity, unit, multiplier }: ComponentProps<ListItemProps>) {
  const finalQuantity = multiplier ? quantity * multiplier : quantity;

  return (
    <li>
      <label>
        <input type="checkbox" name={productDoc.name['pl-PL']} />
        {productDoc.name['pl-PL']} - {finalQuantity} {unit}
      </label>
    </li>
  );
}
