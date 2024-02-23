import { type Ingredient } from '../models/ingredient';

export function getGroupedIngredients(ingredients: Ingredient[]): Ingredient[] {
  if (ingredients.length === 0) return [];

  const groupedIngredients = ingredients.reduce(
    (acc, ingredient) => {
      const key = `${ingredient.name}.${ingredient.unit}`;

      acc[key] ? (acc[key].quantity += ingredient.quantity) : (acc[key] = ingredient);

      return acc;
    },
    {} as Record<string, Ingredient>,
  );

  return Object.entries(groupedIngredients).map((entry) => entry[1]);
}
