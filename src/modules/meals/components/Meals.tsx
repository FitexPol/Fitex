import { type User } from '@auth/models/user';
import { type ComponentProps } from '@types';

import { AddMealCard } from './AddMealCard';
import { MealCard } from './MealCard';
import { Meal } from '../models/meal';

type MealsProps = {
  user: User;
};

export async function Meals({ user }: ComponentProps<MealsProps>) {
  const mealDocs = await Meal.find({ author: user.id }).sort({ creationDate: -1 }).exec();

  return (
    <section id="meals-section">
      <h1 class="mb-4">Your meals</h1>

      <ul class="grid grid-cols-4 gap-2 xl:grid-cols-5">
        <li>
          <AddMealCard />
        </li>

        {mealDocs.map((mealDoc) => (
          <li>
            <MealCard meal={mealDoc} />
          </li>
        ))}
      </ul>
    </section>
  );
}
