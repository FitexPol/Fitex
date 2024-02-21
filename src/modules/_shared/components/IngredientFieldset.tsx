import { icons } from 'feather-icons';

import { Button } from './Button';
import { Input } from './inputs/Input';
import { Select, type SelectOption } from './inputs/Select';
import { type ComponentProps, type FormControl, type Ingredient } from '../types';

type IngredientFieldsetProps = {
  controls: FormControl[];
  ingredientOptions: SelectOption[];
  ingredient?: Ingredient;
};

const unitOptions: SelectOption[] = [
  { value: 'g', label: 'g' },
  { value: 'kg', label: 'kg' },
  { value: 'ml', label: 'ml' },
  { value: 'l', label: 'l' },
  { value: 'unit', label: 'unit' },
];

export function IngredientFieldset({
  controls,
  ingredientOptions,
  ingredient,
}: ComponentProps<IngredientFieldsetProps>) {
  const [nameControl, quantityControl, unitControl] = controls;

  return (
    <fieldset class="grid grid-cols-12 gap-x-1">
      <Select control={nameControl} value={ingredient?.name} options={ingredientOptions} class="col-span-6" />
      <Input control={quantityControl} value={ingredient?.quantity?.toString() ?? '1'} class="col-span-2" />
      <Select control={unitControl} value={ingredient?.unit} options={unitOptions} class="col-span-3" />

      <Button class="col-span-1 h-[3.2rem] border-none" onclick="removeIngredient(this)">
        {icons.trash.toSvg({ class: 'm-auto' })}
      </Button>
    </fieldset>
  );
}
