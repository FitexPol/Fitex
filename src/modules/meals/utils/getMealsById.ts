import { Meal, type MealDoc } from '../models/meal';

export async function getMealsById(
  mealsBody: { mealId: string; quantity: string }[],
): Promise<{ meal: MealDoc; quantity: number }[]> {
  const mealDocs = await Meal.find({ _id: { $in: mealsBody.map(({ mealId }) => mealId) } });

  const meals: { meal: MealDoc; quantity: number }[] = mealDocs.reduce(
    (acc, mealDoc) => {
      const meal = mealsBody.find(({ mealId }) => mealId === mealDoc.id);

      if (!meal) return acc;

      acc.push({
        meal: mealDoc,
        quantity: Number(meal.quantity),
      });

      return acc;
    },
    [] as { meal: MealDoc; quantity: number }[],
  );

  return meals;
}
