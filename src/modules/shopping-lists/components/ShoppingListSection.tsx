import { icons } from 'feather-icons';

import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Switch } from '@components/inputs/Switch';
import { Link } from '@components/Link';
import { type ProductDoc } from '@products/models/product';
import { getProductName } from '@products/utils/getProductName';
import { type ComponentProps, type JWTUser } from '@types';
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
      populate: { path: 'products.product' },
    })
    .populate('products.product')
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
          <Button
            class="visible absolute right-4 top-4 mr-auto w-auto border-none px-0"
            hx-patch={`/api/shopping-lists/${shoppingListDoc.id}/toggle-favorite`}
            hx-target="#shopping-list-section"
            hx-swap="outerHTML"
            hx-indicator="#loader"
          >
            {icons.star.toSvg({ class: $tm(shoppingListDoc.isFavorite && 'fill-current') })}
          </Button>

          <Card.Header title={shoppingListDoc.name} />

          {shoppingListDoc.meals.length === 0 && shoppingListDoc.products.length === 0 ? (
            <span>{_t('shoppingListSection.noMealsAndProducts')}</span>
          ) : (
            <>
              <Link
                href={getPath(`/shopping-lists/${shoppingListDoc.id}`, {
                  groupByMeals: groupByMealsQuery ? '' : 'on',
                })}
              >
                <Switch control={{ name: 'groupByMeals' }} class="mb-4" checked={!!groupByMealsQuery}>
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
              <Link
                href={getPath('/shopping-lists/form', { shoppingListId: shoppingListDoc.id })}
                role="button"
                class="contrast"
              >
                {_tShared('_shared.edit')}
              </Link>

              <Button
                class="secondary w-auto py-2"
                hx-delete={`/api/shopping-lists/${shoppingListDoc.id}`}
                hx-confirm={_t('_shared.deletionConfirmation')}
                hx-indicator="#loader"
              >
                {_tShared('_shared.delete')}
              </Button>
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
            <ListSection>
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
            </ListSection>
          ) : (
            <span class="mb-5 block">{_tShared('_shared.errors.population')}</span>
          );
        })}

      {products.length > 0 && (
        <ListSection>
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
        </ListSection>
      )}
    </>
  );
}

function AllProducts({ shoppingListDoc }: ComponentProps<{ shoppingListDoc: ShoppingListDoc }>) {
  const { meals, products } = shoppingListDoc;
  const allProducts: { productDoc: ProductDoc; quantity: number; unit: Unit }[] = [];

  if (meals.length > 0) {
    meals.forEach(({ meal, quantity }) => {
      const mealDoc = getPopulatedDoc(meal);

      if (!mealDoc) return;

      mealDoc.products.forEach(({ product, quantity: productQuantity, unit }) => {
        const productDoc = getPopulatedDoc(product);

        if (!productDoc) return;

        allProducts.push({ productDoc, quantity: productQuantity * quantity, unit });
      });
    });
  }

  if (products.length > 0) {
    products.forEach(({ product, quantity, unit }) => {
      const productDoc = getPopulatedDoc(product);

      if (!productDoc) return;

      allProducts.push({ productDoc, quantity, unit });
    });
  }

  const groupedProducts = allProducts.reduce(
    (acc, { productDoc, quantity, unit }) => {
      const key = `${productDoc.id}.${unit}`;

      acc[key] ? (acc[key].quantity += quantity) : (acc[key] = { productDoc, quantity, unit });

      return acc;
    },
    {} as Record<string, { productDoc: ProductDoc; quantity: number; unit: Unit }>,
  );

  const groupedProductsArray = Object.entries(groupedProducts).map((entry) => entry[1]);

  return (
    <ListSection>
      <>
        <Title>{_t('shoppingListSection.allProducts')}</Title>

        {groupedProductsArray.length > 0 ? (
          <List>
            <>
              {groupedProductsArray.map(({ productDoc, quantity, unit }) => (
                <Item productDoc={productDoc} quantity={quantity} unit={unit} />
              ))}
            </>
          </List>
        ) : (
          <span>{_t('shoppingListSection.noProducts')}</span>
        )}
      </>
    </ListSection>
  );
}

function ListSection({ children }: ComponentProps) {
  return <div class="mt-4 first-of-type:mt-0">{children}</div>;
}

function Title({ children }: ComponentProps) {
  return <h3 class="mb-1">{children}:</h3>;
}

function List({ children }: ComponentProps) {
  return <ul class="w-fit">{children}</ul>;
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
        <input type="checkbox" name={productDoc.name} />
        {getProductName(productDoc.name)} - {finalQuantity} {unit}
      </label>
    </li>
  );
}
