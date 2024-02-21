import translations from '@/i18n/pl-PL/_shared.json';

import { $t } from './$t';
import { type SelectOption } from '../components/inputs/Select';

const _t = $t('_shared');

const ingredientOptions = Object.keys(translations._shared.ingredients).map((key) => ({
  value: key,
  label: key,
}));

export function getIngredientOptions(): SelectOption[] {
  return ingredientOptions
    .map((option) => ({
      ...option,
      label: _t(`_shared.ingredients.${option.label}`),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}
