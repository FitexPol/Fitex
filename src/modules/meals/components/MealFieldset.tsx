import { icons } from 'feather-icons';

import { Button } from '@components/Button';
import { Input } from '@components/inputs/Input';
import { Select, type SelectOption } from '@components/inputs/Select';
import { type ComponentProps, type Form } from '@types';
import { $t } from '@utils/$t';

import { type MealDoc } from '../models/meal';

const _tShared = $t('_shared');

const form = {
  name: {
    type: 'text',
    name: 'meals[].mealId',
    placeholder: '_shared._shared.forms.name',
    validators: {
      required: true,
      message: 'Meal is required',
    },
  },
  quantity: {
    type: 'number',
    name: 'meals[].quantity',
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
    <fieldset class="grid !grid-cols-12 gap-x-1 border-b border-solid border-b-pico-muted pb-6 md:mb-0 md:border-none md:pb-0">
      <Select
        control={form.name}
        value={mealDoc?.id}
        label={_tShared('_shared.forms.name')}
        options={mealOptions}
        class="col-span-12 md:col-span-8"
      />

      <Input
        control={form.quantity}
        value={quantity?.toString() ?? '1'}
        label={_tShared('_shared.forms.quantity')}
        class="col-span-12 md:col-span-3"
      />

      <Button class="pico-reset col-span-12 !m-auto h-fit w-fit md:col-span-1" onclick="removeRow(this)">
        {icons.trash.toSvg({ class: 'm-auto' })}
      </Button>
    </fieldset>
  );
}
