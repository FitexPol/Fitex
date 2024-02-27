import { icons } from 'feather-icons';

import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Link } from '@components/Link';
import { getProductName } from '@products/utils/getProductName';
import { type ComponentProps, type JWTUser } from '@types';
import { $t } from '@utils/$t';
import { $tm } from '@utils/$tm';
import { getPath } from '@utils/getPath';
import { getPopulatedDoc } from '@utils/getPopulatedDoc';

import { Meal } from '../models/meal';

const _t = $t('meals');
const _tShared = $t('_shared');

type MealSectionProps = {
  user: JWTUser;
  mealId: string;
};

export async function MealSection({ user, mealId }: ComponentProps<MealSectionProps>) {
  const mealDoc = await Meal.findById(mealId).populate('products.product').exec();

  if (!mealDoc) {
    return <span>{_t('_shared.notFound')}</span>;
  }

  if (!mealDoc.author._id.equals(user.id)) {
    return <span>{_t('_shared.permissionDenied')}</span>;
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

          {mealDoc.products.length > 0 ? (
            <ul class="w-fit">
              {mealDoc.products.map(({ product, quantity, unit }) => {
                const productDoc = getPopulatedDoc(product);

                return (
                  <li>
                    {productDoc ? (
                      <label>
                        <input type="checkbox" name={productDoc.name} />
                        {getProductName(productDoc.name)} - {quantity} {unit}
                      </label>
                    ) : (
                      <span>{_tShared('_shared.errors.population')}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <span>{_t('mealSection.noProducts')}</span>
          )}

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
