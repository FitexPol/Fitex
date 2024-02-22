import { icons } from 'feather-icons';

import { type User } from '@auth/models/user';
import { Button } from '@components/Button';
import { IngredientFieldset } from '@components/IngredientFieldset';
import { Input } from '@components/inputs/Input';
import { type SelectOption } from '@components/inputs/Select';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { getIngredientOptions } from '@utils/getIngredientOptions';

import { MealFieldset } from './MealFieldset';
import { type ShoppingListFormErrors, shoppingListForm } from '../forms';
import { type ShoppingList } from '../models/shoppingList';
import { getMealOptions } from '../utils/getMealOptions';

const _t = $t('shoppingLists');
const _tShared = $t('_shared');

type ShoppingListFormProps = {
  user: User;
  shoppingList?: ShoppingList;
  errors?: ShoppingListFormErrors;
};

export async function ShoppingListForm({
  user,
  shoppingList,
  errors,
}: ComponentProps<ShoppingListFormProps>) {
  const mealOptions: SelectOption[] = await getMealOptions(user);
  const ingredientOptions: SelectOption[] = getIngredientOptions();
  const [method, endpoint] = shoppingList
    ? ['PATCH', `/api/shopping-lists/${shoppingList.id}`]
    : ['POST', '/api/shopping-lists'];

  return (
    <form id="shopping-list-form" onsubmit={`submitForm(event, '${method}', '${endpoint}', this)`}>
      <Input control={shoppingListForm.name} value={shoppingList?.name} error={errors?.name} />

      <span class="mb-2 block">{_t('_shared.meals')}:</span>

      <ul id="meals">
        {!!shoppingList && shoppingList.meals.length > 0 ? (
          shoppingList.meals.map((meal) => (
            <li>
              <MealFieldset mealOptions={mealOptions} meal={meal} />
            </li>
          ))
        ) : (
          <li>
            <MealFieldset mealOptions={mealOptions} />
          </li>
        )}
      </ul>

      <Button
        type="button"
        class="mx-auto mb-5 w-auto border-none"
        hx-get="/api/shopping-lists/meal-fieldset"
        hx-target="#meals"
        hx-swap="beforeend"
      >
        {icons['plus-circle'].toSvg()}
      </Button>

      <span class="mb-2 block">{_t('_shared.additionalIngredients')}:</span>

      <ul id="additional-ingredients">
        {!!shoppingList && shoppingList.ingredients.length > 0 ? (
          shoppingList.ingredients.map((ingredient) => (
            <li>
              <IngredientFieldset
                controls={shoppingListForm.ingredients}
                ingredientOptions={ingredientOptions}
                ingredient={ingredient}
              />
            </li>
          ))
        ) : (
          <li>
            <IngredientFieldset
              controls={shoppingListForm.ingredients}
              ingredientOptions={ingredientOptions}
            />
          </li>
        )}
      </ul>

      <Button
        type="button"
        class="mx-auto mb-5 w-auto border-none"
        hx-get="/api/shopping-lists/ingredient-fieldset"
        hx-target="#additional-ingredients"
        hx-swap="beforeend"
      >
        {icons['plus-circle'].toSvg()}
      </Button>

      <Button type="submit" class="contrast">
        {_tShared('_shared.forms.submit')}
      </Button>
    </form>
  );
}
