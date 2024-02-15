import { type User } from '@auth/models/user';
import { Button } from '@components/Button';
import { type ComponentProps } from '@types';

import { Meal } from '../models/meal';

type MealSectionProps = {
  user: User;
  mealId: string;
};

export async function MealSection({ user, mealId }: ComponentProps<MealSectionProps>) {
  const mealDoc = await Meal.findById(mealId).exec();

  if (!mealDoc) {
    return <span>Meal not found</span>;
  }

  if (!mealDoc.author._id.equals(user.id)) {
    return <span>You don't have permission to see this meal</span>;
  }

  return (
    <section id="meal-section">
      <article class="my-0">
        <header>
          <h1 class="">{mealDoc.name}</h1>
        </header>

        <ul class="w-fit">
          {mealDoc.ingredients.map((ingredient) => (
            <li>
              <label>
                <input type="checkbox" name={ingredient.name} />
                {ingredient.name} - {ingredient.quantity} {ingredient.unit}
              </label>
            </li>
          ))}
        </ul>

        <p class="mt-10">{mealDoc.description}</p>

        <footer class="flex justify-end gap-2">
          <Button
            class="contrast w-auto py-2 font-bold"
            hx-get={`/api/meals/modal?mealId=${mealDoc.id}`}
            hx-target="#modal-portal"
          >
            Edytuj
          </Button>

          <Button
            class="secondary w-auto py-2"
            hx-delete={`/api/meals/${mealDoc.id}`}
            hx-confirm="Are you sure you want to delete this meal? This action cannot be undone."
          >
            Usuń
          </Button>
        </footer>
      </article>
    </section>
  );
}
