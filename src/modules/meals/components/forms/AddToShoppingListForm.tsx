import { type JWTUser } from '@auth/models/user';
import { Button } from '@components/Button';
import { Checkbox } from '@components/inputs/Checkbox';
import { Select } from '@components/inputs/Select';
import { ShoppingList } from '@shopping-lists/models/shoppingList';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { getRoundedQuantity } from '@utils/getRoundedQuantity';

import { type MealDoc } from '../../models/meal';

type AddToShoppingListProps = {
  user: JWTUser;
  mealDoc: MealDoc;
};

export async function AddToShoppingListForm({ user, mealDoc }: ComponentProps<AddToShoppingListProps>) {
  const shoppingListDocs = await ShoppingList.find({ author: user.id });

  return (
    <form onsubmit={`submitAddToShoppingListForm(event, this, '${mealDoc.id}')`}>
      <fieldset>
        <legend>{$t('meals.chooseProductsToAdd')}</legend>
        {mealDoc.products
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(({ id, name, quantity, unit }) => (
            <Checkbox name={`product-${id}`}>
              <>
                {name} - {getRoundedQuantity(quantity)} {unit}
              </>
            </Checkbox>
          ))}

        <small class="text-xs">* {$t('meals.chooseProductsToAdd.hint')}</small>
      </fieldset>

      <Select
        control={{ type: 'text', name: 'shoppingListId' }}
        options={shoppingListDocs.map(({ id, name }) => ({ value: id, label: name }))}
        label={$t('meals.chooseShoppingList')}
      />

      <Button type="submit">{$t('_submit')}</Button>
    </form>
  );
}
