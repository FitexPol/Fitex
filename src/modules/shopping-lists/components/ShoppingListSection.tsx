import { icons } from 'feather-icons';

import { type User } from '@auth/models/user';
import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Switch } from '@components/inputs/Switch';
import { Link } from '@components/Link';
import { type Ingredient } from '@models/ingredient';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { $tm } from '@utils/$tm';
import { getPath } from '@utils/getPath';

import { ShoppingList } from '../models/shoppingList';

const _t = $t('shoppingLists');
const _tShared = $t('_shared');

type ShoppingListSectionProps = {
  user: User;
  shoppingListId: string;
  groupByMealsQuery: string;
};

export async function ShoppingListSection({
  user,
  shoppingListId,
  groupByMealsQuery,
}: ComponentProps<ShoppingListSectionProps>) {
  const shoppingListDoc = await ShoppingList.findById(shoppingListId).exec();

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

          <Link
            href={getPath(`/shopping-lists/${shoppingListDoc.id}`, {
              groupByMeals: groupByMealsQuery ? '' : 'on',
            })}
          >
            <Switch control={{ name: 'groupByMeals' }} class="mb-4" checked={!!groupByMealsQuery}>
              <span class="mr-2">Grupuj według posiłków</span>
            </Switch>
          </Link>

          {groupByMealsQuery ? (
            <>
              {shoppingListDoc.meals.length > 0 &&
                shoppingListDoc.meals.map(({ meal, quantity }) => (
                  <List title={<Link href={`/meals/${meal.id}`}>{`${meal.name} x ${quantity}`}</Link>}>
                    <>
                      {meal.ingredients.map((ingredient) => (
                        <ListItem ingredient={ingredient} multiplier={quantity} />
                      ))}
                    </>
                  </List>
                ))}

              {shoppingListDoc.ingredients.length > 0 && (
                <List title={_t('_shared.additionalIngredients')}>
                  <>
                    {shoppingListDoc.ingredients.map((ingredient) => (
                      <ListItem ingredient={ingredient} />
                    ))}
                  </>
                </List>
              )}
            </>
          ) : (
            <>
              <List title="Wszystkie składniki">
                <>
                  {getAllIngredients(shoppingListDoc.toObject()).map((ingredient) => (
                    <ListItem ingredient={ingredient} />
                  ))}
                </>
              </List>
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

type ListProps = {
  title: JSX.Element;
};

function List({ title, children }: ComponentProps<ListProps>) {
  return (
    <div class="mt-4 first-of-type:mt-0">
      <h3 class="mb-1">{title}:</h3>
      <ul class="w-fit">{children}</ul>
    </div>
  );
}

type ListItemProps = {
  ingredient: Ingredient;
  multiplier?: number;
};

function ListItem({ ingredient, multiplier }: ComponentProps<ListItemProps>) {
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

function getAllIngredients({ meals, ingredients }: ShoppingList): Ingredient[] {
  if (meals.length === 0 && ingredients.length === 0) return [];

  const allIngredients: Record<string, Ingredient> = {};

  if (meals.length > 0) {
    meals.forEach(({ meal, quantity }) => {
      meal.ingredients.forEach((ingredient) => {
        if (!allIngredients[ingredient.name]) {
          allIngredients[ingredient.name] = { ...ingredient, quantity: ingredient.quantity * quantity };
          return;
        }

        allIngredients[ingredient.name].quantity += ingredient.quantity * quantity;
      });
    });
  }

  if (ingredients.length > 0) {
    ingredients.forEach((ingredient) => {
      if (!allIngredients[ingredient.name]) {
        allIngredients[ingredient.name] = ingredient;
        return;
      }

      allIngredients[ingredient.name].quantity += ingredient.quantity;
    });
  }

  return Object.values(allIngredients);
}
