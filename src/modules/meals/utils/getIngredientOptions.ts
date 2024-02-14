import { type SelectOption } from '@components/Select';
import { getEnvSecure } from '@utils/getEnvSecure';

export async function getIngredientOptions(): Promise<SelectOption[]> {
  const { meals: ingredients }: { meals: { strIngredient: string }[] } = await fetch(
    `${getEnvSecure('INGREDIENTS_API')}`,
  ).then((res) => res.json());

  const ingredientOptions: SelectOption[] = ingredients
    .map(({ strIngredient }) => ({
      value: strIngredient,
      label: strIngredient,
    }))
    .sort((a, b) => (a.label < b.label ? -1 : a.label > b.label ? 1 : 0));

  return ingredientOptions;
}
