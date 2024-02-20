import { type User } from '@auth/models/user';
import { Button } from '@components/Button';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { getPath } from '@utils/getPath';

import { Meal } from '../models/meal';

const _t = $t('meals');

type MealSectionProps = {
  user: User;
  mealId: string;
};

export async function MealSection({ user, mealId }: ComponentProps<MealSectionProps>) {
  const mealDoc = await Meal.findById(mealId).exec();

  if (!mealDoc) {
    return <span>{_t('mealSection.notFound')}</span>;
  }

  if (!mealDoc.author._id.equals(user.id)) {
    return <span>{_t('mealSection.permissionDenied')}</span>;
  }

  return (
    <section id="meal-section">
      <article class="my-0">
        <header>
          <h1 class="">{mealDoc.name}</h1>
        </header>

        <ul class="w-fit">
          {mealDoc.ingredients.map(({ name, quantity, unit }) => (
            <li>
              <label>
                <input type="checkbox" name={name} />
                {_t(`mealForm.ingredients.options.${name}`)} - {quantity} {unit}
              </label>
            </li>
          ))}
        </ul>

        <p class="mt-10">{mealDoc.description}</p>

        <footer class="flex justify-end gap-2">
          <Button
            class="contrast w-auto py-2 font-bold"
            hx-get={getPath('/api/meals/modal', { mealId: mealDoc.id.toString() })}
            hx-target="#modal-portal"
            hx-indicator="#loader"
          >
            {_t('mealSection.edit')}
          </Button>

          <Button
            class="secondary w-auto py-2"
            hx-delete={`/api/meals/${mealDoc.id}`}
            hx-confirm="Are you sure you want to delete this meal? This action cannot be undone."
          >
            {_t('mealSection.delete')}
          </Button>
        </footer>
      </article>
    </section>
  );
}
