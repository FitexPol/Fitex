import { icons } from 'feather-icons';

import { Button } from '@components/Button';
import { Input } from '@components/inputs/Input';
import { Select, type SelectOption } from '@components/inputs/Select';
import { type ComponentProps, type Form } from '@types';

import { type MealDoc } from '../models/meal';

const form = {
  name: {
    type: 'text',
    name: 'mealId',
    placeholder: '_shared._shared.forms.name',
    validators: {
      required: true,
      message: 'Meal is required',
    },
  },
  quantity: {
    type: 'number',
    name: 'quantity',
    validators: {
      required: true,
      min: 1,
      max: 100,
      message: 'Must be at least 1',
    },
  },
} satisfies Form;

type MealFieldsetProps = {
  mealOptions: SelectOption[];
  mealDoc?: MealDoc;
  quantity?: number;
};

export function MealFieldset({ mealOptions, mealDoc, quantity }: ComponentProps<MealFieldsetProps>) {
  return (
    <form class="grid grid-cols-12 gap-x-1">
      <Select control={form.name} value={mealDoc?.id} options={mealOptions} class="col-span-8" />
      <Input control={form.quantity} value={quantity?.toString() ?? '1'} class="col-span-3" />

      <Button class="col-span-1 h-[3.2rem] border-none" onclick="removeRow(this)">
        {icons.trash.toSvg({ class: 'm-auto' })}
      </Button>
    </form>
  );
}
