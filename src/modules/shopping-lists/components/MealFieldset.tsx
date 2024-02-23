import { icons } from 'feather-icons';

import { Button } from '@components/Button';
import { Input } from '@components/inputs/Input';
import { Select, type SelectOption } from '@components/inputs/Select';
import { type ComponentProps } from '@types';
import { getPopulatedDoc } from '@utils/getPopulatedDoc';

import { shoppingListForm } from '../forms';
import { type ShoppingListDoc } from '../models/shoppingList';

type MealFieldsetProps = {
  mealOptions: SelectOption[];
  meal?: ShoppingListDoc['meals'][0];
};

export function MealFieldset({ mealOptions, meal }: ComponentProps<MealFieldsetProps>) {
  const [nameControl, quantityControl] = shoppingListForm.meals;
  const mealDoc = meal && getPopulatedDoc(meal.meal);

  return (
    <fieldset class="grid grid-cols-12 gap-x-1">
      <Select control={nameControl} value={mealDoc?.name ?? ''} options={mealOptions} class="col-span-8" />
      <Input control={quantityControl} value={meal?.quantity?.toString() ?? '1'} class="col-span-3" />

      <Button class="col-span-1 h-[3.2rem] border-none" onclick="removeRow(this)">
        {icons.trash.toSvg({ class: 'm-auto' })}
      </Button>
    </fieldset>
  );
}
