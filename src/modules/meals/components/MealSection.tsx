import { icons } from 'feather-icons';

import { type User } from '@auth/models/user';
import { Button } from '@components/Button';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { $tm } from '@utils/$tm';
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
      <article class="relative my-0">
        <Button
          class="visible absolute left-2 top-2 mr-auto w-auto border-none px-0"
          hx-patch={`/api/meals/${mealDoc.id}/toggle-favorite`}
          hx-target="#meal-section"
          hx-swap="outerHTML"
          hx-indicator="#loader"
        >
          {icons.star.toSvg({ class: $tm(mealDoc.isFavorite && 'fill-current') })}
        </Button>

        <header>
          <h1>{mealDoc.name}</h1>
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
            hx-get={getPath('/api/meals/modal', { mealId: mealDoc.id })}
            hx-target="#modal-portal"
            hx-indicator="#loader"
          >
            {_t('mealSection.edit')}
          </Button>

          <Button
            class="secondary w-auto py-2"
            hx-delete={`/api/meals/${mealDoc.id}`}
            hx-confirm={_t('_shared.deletionConfirmation')}
            hx-indicator="#loader"
          >
            {_t('mealSection.delete')}
          </Button>
        </footer>
      </article>
    </section>
  );
}
