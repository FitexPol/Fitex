import { Meal, type MealDoc } from '../models/meal';

export async function getMealsById(
  mealsBody: { mealId: string; quantity: number }[],
): Promise<{ meal: MealDoc; quantity: number }[]> {
  const mealDocs = await Meal.find({ _id: { $in: mealsBody.map(({ mealId }) => mealId) } });

  return mealsBody.reduce(
    (acc, { mealId, quantity }) => {
      const mealDoc = mealDocs.find(({ id }) => id === mealId);

      if (!mealDoc) return acc;

      acc.push({
        meal: mealDoc,
        quantity,
      });

      return acc;
    },
    [] as { meal: MealDoc; quantity: number }[],
  );
}
