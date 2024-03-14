import { Button } from '@components/Button';
import { Input } from '@components/inputs/Input';
import { Select } from '@components/inputs/Select';
import { type MealDoc } from '@meals/models/meal';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { updateMealForm } from '../../forms/update-meal';

const _tShared = $t('_shared');

type UpdateMealFormProps = {
  shoppingListId: string;
  mealDoc: MealDoc;
  quantity?: number;
};

export function UpdateMealForm({ shoppingListId, mealDoc, quantity }: ComponentProps<UpdateMealFormProps>) {
  return (
    <form hx-patch={`/api/shopping-lists/${shoppingListId}/meals/${mealDoc.id}`}>
      <Select
        control={updateMealForm.mealId}
        value={mealDoc.id}
        label={_tShared('_shared.forms.name')}
        options={[{ label: mealDoc.name, value: mealDoc.id }]}
      />

      <Input
        control={updateMealForm.quantity}
        value={quantity?.toString() ?? '1'}
        label={_tShared('_shared.forms.quantity')}
        step=".1"
      />

      <Button type="submit">{_tShared('_shared.forms.submit')}</Button>
    </form>
  );
}
