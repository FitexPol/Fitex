import { type SelectOption } from '@components/inputs/Select';
import { type JWTUser } from '@types';

import { Meal } from '../models/meal';

export async function getMealOptions(user: JWTUser): Promise<SelectOption[]> {
  const mealDocs = await Meal.find({ author: user.id }).sort({ name: 1 });

  return mealDocs.map(({ id, name }) => ({
    value: id,
    label: name,
  }));
}
