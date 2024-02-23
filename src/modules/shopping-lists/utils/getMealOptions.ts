import { type SelectOption } from '@components/inputs/Select';
import { Meal } from '@meals/models/meal';
import { type JWTUser } from '@types';

export async function getMealOptions(user: JWTUser): Promise<SelectOption[]> {
  const mealDocs = await Meal.find({ author: user.id }).sort({ name: 1 });

  return mealDocs.map(({ id, name }) => ({
    value: id,
    label: name,
  }));
}
