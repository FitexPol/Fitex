import { type Ingredient } from '../models/ingredient';

export function getGroupedIngredients(ingredients: Ingredient[]): Ingredient[] {
  if (ingredients.length === 0) return [];

  const groupedIngredients = ingredients.reduce(
    (acc, ingredient) => {
      acc[ingredient.name]
        ? (acc[ingredient.name].quantity += ingredient.quantity)
        : (acc[ingredient.name] = ingredient);

      return acc;
    },
    {} as Record<string, Ingredient>,
  );

  return Object.values(groupedIngredients);
}
