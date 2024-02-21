import { icons } from 'feather-icons';

import { Button } from '@components/Button';
import { IngredientFieldset } from '@components/IngredientFieldset';
import { Input } from '@components/inputs/Input';
import { type SelectOption } from '@components/inputs/Select';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { getIngredientOptions } from '@utils/getIngredientOptions';

import { type ShoppingListFormErrors, shoppingListForm } from '../forms';
import { type ShoppingList } from '../models/shoppingList';

const _t = $t('shoppingLists');
const _tShared = $t('_shared');

type ShoppingListFormProps = {
  shoppingList?: ShoppingList;
  errors?: ShoppingListFormErrors;
};

export function ShoppingListForm({ shoppingList, errors }: ComponentProps<ShoppingListFormProps>) {
  const ingredientOptions: SelectOption[] = getIngredientOptions();
  const [method, endpoint] = shoppingList
    ? ['PATCH', `/api/shopping-lists/${shoppingList.id}`]
    : ['POST', '/api/shopping-lists'];

  return (
    <form id="shopping-list-form" onsubmit={`submitForm(event, '${method}', '${endpoint}', this)`}>
      <Input control={shoppingListForm.name} value={shoppingList?.name} error={errors?.name} />

      <span class="mb-2 block">{_t('shoppingListForm.additionalIngredients')}:</span>

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
