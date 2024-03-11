import { icons } from 'feather-icons';

import { type JWTUser } from '@auth/models/user';
import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Link } from '@components/Link';
import { ListProducts } from '@products/components/ListProducts';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { $tm } from '@utils/$tm';
import { getPath } from '@utils/getPath';

import { Meal } from '../models/meal';

const _t = $t('meals');
const _tShared = $t('_shared');

type MealSectionProps = {
  user: JWTUser;
  mealId: string;
};

export async function MealSection({ user, mealId }: ComponentProps<MealSectionProps>) {
  const mealDoc = await Meal.findById(mealId).exec();

  if (!mealDoc) {
    return <span>{_t('_shared.errors.notFound')}</span>;
  }

  if (!mealDoc.author._id.equals(user.id)) {
    return <span>{_t('_shared.permissionDenied')}</span>;
  }

  return (
    <section id="meal-section">
      <Card class="relative">
        <>
          <Card.Header title={<h1 class="mb-0 pr-7 text-2xl">{mealDoc.name}</h1>}>
            <Button
              class="pico-reset absolute right-4 top-4"
              hx-patch={`/api/meals/${mealDoc.id}/toggle-favorite`}
              hx-target="#meal-section"
              hx-swap="outerHTML"
              hx-indicator="#loader"
            >
              {icons.star.toSvg({ class: $tm(mealDoc.isFavorite && 'fill-current') })}
            </Button>
          </Card.Header>

          <ListProducts products={mealDoc.products}>
            <ListProducts.Title />
          </ListProducts>

          {mealDoc.description && <p>{mealDoc.description}</p>}

          <Card.Footer class="flex justify-end gap-2">
            <>
              <Button
                class="!mb-0 outline"
                hx-delete={`/api/meals/${mealDoc.id}`}
                hx-confirm={_t('_shared.deletionConfirmation')}
                hx-indicator="#loader"
              >
                {_tShared('_shared.delete')}
              </Button>

              <Link href={getPath('/meals/form', { mealId: mealDoc.id })} role="button">
                {_tShared('_shared.edit')}
              </Link>
            </>
          </Card.Footer>
        </>
      </Card>
    </section>
  );
}
