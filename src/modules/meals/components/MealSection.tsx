import { icons } from 'feather-icons';

import { Link } from '@/modules/_shared/components/Link';
import { type User } from '@auth/models/user';
import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { $tm } from '@utils/$tm';
import { getPath } from '@utils/getPath';

import { Meal } from '../models/meal';

const _t = $t('meals');
const _tShared = $t('_shared');

type MealSectionProps = {
  user: User;
  mealId: string;
};

export async function MealSection({ user, mealId }: ComponentProps<MealSectionProps>) {
  const mealDoc = await Meal.findById(mealId).exec();

  if (!mealDoc) {
    return <span>{_t('_shared.notFound')}</span>;
  }

  if (!mealDoc.author._id.equals(user.id)) {
    return <span>{_t('mealSection.permissionDenied')}</span>;
  }

  return (
    <section id="meal-section">
      <Card class="relative">
        <>
          <Button
            class="visible absolute right-4 top-4 mr-auto w-auto border-none px-0"
            hx-patch={`/api/meals/${mealDoc.id}/toggle-favorite`}
            hx-target="#meal-section"
            hx-swap="outerHTML"
            hx-indicator="#loader"
          >
            {icons.star.toSvg({ class: $tm(mealDoc.isFavorite && 'fill-current') })}
          </Button>

          <Card.Header title={mealDoc.name} />

          <ul class="w-fit">
            {mealDoc.ingredients.map(({ name, quantity, unit }) => (
              <li>
                <label>
                  <input type="checkbox" name={name} />
                  {_tShared(`_shared.ingredients.${name}`)} - {quantity} {unit}
                </label>
              </li>
            ))}
          </ul>

          <p class="mt-10">{mealDoc.description}</p>

          <Card.Footer class="flex justify-end gap-2">
            <>
              <Link href={getPath('/meals/form', { mealId: mealDoc.id })} role="button" class="contrast">
                {_tShared('_shared.edit')}
              </Link>

              <Button
                class="secondary w-auto py-2"
                hx-delete={`/api/meals/${mealDoc.id}`}
                hx-confirm={_t('_shared.deletionConfirmation')}
                hx-indicator="#loader"
              >
                {_tShared('_shared.delete')}
              </Button>
            </>
          </Card.Footer>
        </>
      </Card>
    </section>
  );
}
