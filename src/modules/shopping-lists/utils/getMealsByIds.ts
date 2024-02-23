import { Meal } from '@meals/models/meal';

import { type ShoppingListDoc } from '../models/shoppingList';

export async function getMealsByIds(
  mealsBody: { id: string; quantity: string }[],
): Promise<ShoppingListDoc['meals']> {
  const mealDocs = await Meal.find({ _id: { $in: mealsBody.map(({ id }) => id) } });

  const meals: ShoppingListDoc['meals'] = mealDocs.reduce(
    (acc, mealDoc) => {
      const meal = mealsBody.find(({ id }) => id === mealDoc.id);

      if (!meal) return acc;

      acc.push({
        meal: mealDoc,
        quantity: Number(meal.quantity),
      });

      return acc;
    },
    [] as ShoppingListDoc['meals'],
  );

  return meals;
}
