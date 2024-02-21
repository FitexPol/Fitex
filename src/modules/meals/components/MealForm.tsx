import { icons } from 'feather-icons';

import { Button } from '@components/Button';
import { IngredientFieldset } from '@components/IngredientFieldset';
import { Input } from '@components/inputs/Input';
import { type SelectOption } from '@components/inputs/Select';
import { Textarea } from '@components/inputs/Textarea';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { getIngredientOptions } from '@utils/getIngredientOptions';

import { type MealForm, type MealFormErrors, mealForm } from '../forms';
import { type Meal } from '../models/meal';

const _t = $t('meals');
const _tShared = $t('_shared');

type MealFormProps = {
  meal?: Meal;
  errors?: MealFormErrors;
};

export function MealForm({ meal, errors }: ComponentProps<MealFormProps>) {
  const ingredientOptions: SelectOption[] = getIngredientOptions();
  const [method, endpoint] = meal ? ['PATCH', `/api/meals/${meal.id}`] : ['POST', '/api/meals'];

  return (
    <form id="meal-form" onsubmit={`submitForm(event, '${method}', '${endpoint}', this)`}>
      <Input control={mealForm.name} value={meal?.name} error={errors?.name} />

      <Textarea
        control={mealForm.description}
        value={meal?.description}
        rows="5"
        error={errors?.description}
      />

      <span class="mb-2 block">{_t('mealForm.ingredients')}:</span>

      <ul id="ingredients">
        {!!meal && meal.ingredients.length > 0 ? (
          meal.ingredients.map((ingredient) => (
            <li>
              <IngredientFieldset
                controls={mealForm.ingredients}
                ingredientOptions={ingredientOptions}
                ingredient={ingredient}
              />
            </li>
          ))
        ) : (
          <li>
            <IngredientFieldset controls={mealForm.ingredients} ingredientOptions={ingredientOptions} />
          </li>
        )}
      </ul>

      <Button
        type="button"
        class="mx-auto mb-5 w-auto border-none"
        hx-get="/api/meals/ingredient-fieldset"
        hx-target="#ingredients"
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
