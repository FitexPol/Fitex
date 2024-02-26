type GroupedMeal = {
  mealId: string;
  quantity: number;
};

export function getGroupedMeals(items: GroupedMeal[]): GroupedMeal[] {
  if (items.length === 0) return [];

  const groupedMeals = items.reduce(
    (acc, { mealId, quantity }) => {
      acc[mealId] ? (acc[mealId].quantity += quantity) : (acc[mealId] = { mealId, quantity });

      return acc;
    },
    {} as Record<string, GroupedMeal>,
  );

  return Object.entries(groupedMeals).map((entry) => entry[1]);
}
