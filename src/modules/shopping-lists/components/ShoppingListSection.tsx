import { icons } from 'feather-icons';

import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Switch } from '@components/inputs/Switch';
import { Link } from '@components/Link';
import { type MealDoc } from '@meals/models/meal';
import { type Ingredient } from '@models/ingredient';
import { type ComponentProps, type JWTUser } from '@types';
import { $t } from '@utils/$t';
import { $tm } from '@utils/$tm';
import { getGroupedIngredients } from '@utils/getGroupedIngredients';
import { getPath } from '@utils/getPath';

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
    return <span>{_t('_shared.notFound')}</span>;
  }

  if (!shoppingListDoc.author._id.equals(user.id)) {
    return <span>{_t('shoppingListSection.permissionDenied')}</span>;
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

          {shoppingListDoc.meals.length === 0 && shoppingListDoc.additionalIngredients.length === 0 ? (
            <span>{_t('shoppingListSection.noMealsAndAdditionalIngredients')}</span>
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
                <GroupedByMealsIngredients shoppingListDoc={shoppingListDoc} />
              ) : (
                <AllIngredients shoppingListDoc={shoppingListDoc} />
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

function GroupedByMealsIngredients({
  shoppingListDoc,
}: ComponentProps<{ shoppingListDoc: ShoppingListDoc }>) {
  const { meals, additionalIngredients } = shoppingListDoc;

  return (
    <>
      {meals.length > 0 &&
        meals.map(({ meal, quantity }) => {
          const { id, name, ingredients } = meal as MealDoc;

          return (
            <ListSection>
              <>
                <Title>
                  <Link href={`/meals/${id}`}>{`${name} x ${quantity}`}</Link>
                </Title>

                {ingredients.length > 0 ? (
                  <List>
                    <>
                      {ingredients.map((ingredient) => (
                        <Item ingredient={ingredient} multiplier={quantity} />
                      ))}
                    </>
                  </List>
                ) : (
                  <span>{_t('shoppingListSection.noMealIngredients')}</span>
                )}
              </>
            </ListSection>
          );
        })}

      {additionalIngredients.length > 0 && (
        <ListSection>
          <>
            <Title>{_t('_shared.additionalIngredients')}</Title>

            <List>
              <>
                {additionalIngredients.map((ingredient) => (
                  <Item ingredient={ingredient} />
                ))}
              </>
            </List>
          </>
        </ListSection>
      )}
    </>
  );
}

function AllIngredients({ shoppingListDoc }: ComponentProps<{ shoppingListDoc: ShoppingListDoc }>) {
  const allIngredients = getAllIngredients(shoppingListDoc);

  return (
    <ListSection>
      <>
        <Title>{_t('shoppingListSection.allIngredients')}</Title>

        {allIngredients.length > 0 ? (
          <List>
            <>
              {allIngredients.map((ingredient) => (
                <Item ingredient={ingredient} />
              ))}
            </>
          </List>
        ) : (
          <span>{_t('shoppingListSection.noIngredients')}</span>
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
  ingredient: Ingredient;
  multiplier?: number;
};

function Item({ ingredient, multiplier }: ComponentProps<ListItemProps>) {
  const { name, quantity, unit } = ingredient;
  const finalQuantity = multiplier ? quantity * multiplier : quantity;

  return (
    <li>
      <label>
        <input type="checkbox" name={name} />
        {_tShared(`_shared.ingredients.${name}`)} - {finalQuantity} {unit}
      </label>
    </li>
  );
}

function getAllIngredients(shoppingList: ShoppingListDoc): Ingredient[] {
  const { meals, additionalIngredients } = shoppingList.toObject();

  if (meals.length === 0 && additionalIngredients.length === 0) return [];

  const allIngredients: Ingredient[] = [];

  if (meals.length > 0) {
    meals.forEach(({ meal, quantity }) => {
      (meal as MealDoc).ingredients.forEach((ingredient) => {
        allIngredients.push({ ...ingredient, quantity: ingredient.quantity * quantity });
      });
    });
  }

  if (additionalIngredients.length > 0) {
    allIngredients.push(...additionalIngredients);
  }

  return getGroupedIngredients(allIngredients);
}
