import { icons } from 'feather-icons';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { type SelectOption } from '@components/Select';
import { Select } from '@components/Select';
import { Textarea } from '@components/Textarea';
import { type ComponentProps } from '@types';

import { type MealForm, type MealFormErrors, mealForm } from '../forms';
import { type Ingredient, type Meal } from '../models/meal';
import { getIngredientOptions } from '../utils/getIngredientOptions';

type MealFormProps = {
  meal?: Meal;
  errors?: MealFormErrors;
};

export async function MealForm({ meal, errors }: ComponentProps<MealFormProps>) {
  const ingredientOptions: SelectOption[] = await getIngredientOptions();
  const mealId = meal ? `'${meal.id}'` : undefined;

  return (
    <form id="meal-form" onsubmit={`submitMealForm(event, this, ${mealId})`}>
      <Input control={mealForm.name} value={meal?.name} error={errors?.name} />

      <Textarea
        control={mealForm.description}
        value={meal?.description}
        rows="5"
        error={errors?.description}
      />

      <span class="mb-2 block">Ingredients:</span>

      <ul id="ingredients">
        {!!meal && meal.ingredients.length > 0 ? (
          meal.ingredients.map((ingredient) => (
            <Ingredient ingredientOptions={ingredientOptions} ingredient={ingredient} />
          ))
        ) : (
          <Ingredient ingredientOptions={ingredientOptions} />
        )}
      </ul>

      <Button
        type="button"
        class="mx-auto mb-5 w-auto border-none"
        hx-get="/api/meals/ingredient"
        hx-target="#ingredients"
        hx-swap="beforeend"
      >
        {icons['plus-circle'].toSvg()}
      </Button>

      <Button type="submit" class="contrast">
        Submit
      </Button>
    </form>
  );
}

type IngredientProps = {
  ingredientOptions: SelectOption[];
  ingredient?: Ingredient;
};

function Ingredient({ ingredientOptions, ingredient }: ComponentProps<IngredientProps>) {
  const unitOptions: SelectOption[] = [
    { value: 'g', label: 'g' },
    { value: 'kg', label: 'kg' },
    { value: 'ml', label: 'ml' },
    { value: 'l', label: 'l' },
    { value: 'unit', label: 'unit' },
  ];
  const [nameControl, quantityControl, unitControl] = mealForm.ingredients;

  return (
    <li class="grid grid-cols-12 gap-x-1">
      <Select control={nameControl} value={ingredient?.name} options={ingredientOptions} class="col-span-6" />
      <Input control={quantityControl} value={ingredient?.quantity?.toString() ?? '1'} class="col-span-2" />
      <Select control={unitControl} value={ingredient?.unit} options={unitOptions} class="col-span-3" />

      <Button class="col-span-1 h-[3.2rem] border-none" onclick="removeIngredient(this)">
        {icons.trash.toSvg({ class: 'm-auto' })}
      </Button>
    </li>
  );
}

MealForm.Ingredient = Ingredient;
