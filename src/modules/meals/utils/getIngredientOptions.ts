import translations from '@/i18n/pl-PL/meals.json';
import { type SelectOption } from '@components/Select';
import { $t } from '@utils/$t';

const _t = $t('meals');

const ingredientOptions = Object.keys(translations.mealForm.ingredients.options).map((key) => ({
  value: key,
  label: key,
}));

export function getIngredientOptions(): SelectOption[] {
  return ingredientOptions
    .map((option) => ({
      ...option,
      label: _t(`mealForm.ingredients.options.${option.label}`),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}
