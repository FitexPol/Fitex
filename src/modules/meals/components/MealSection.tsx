import { icons } from 'feather-icons';

import { Checkbox } from '@components/inputs/Checkbox';
import { Link } from '@components/Link';
import { CardSection } from '@components/sections/CardSection';
import type { ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { getRoundedQuantity } from '@utils/getRoundedQuantity';

import { type MealDoc } from '../models/meal';

type MealSectionProps = {
  mealDoc: MealDoc;
};

export async function MealSection({ mealDoc }: ComponentProps<MealSectionProps>) {
  return (
    <CardSection entity={mealDoc} basePath="meals">
      <>
        {mealDoc.products.length > 0 ? (
          <ul>
            {mealDoc.products
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(({ name, quantity, unit }) => (
                <li>
                  <Checkbox name={name}>
                    <>
                      {name} - {getRoundedQuantity(quantity)} {unit}
                    </>
                  </Checkbox>
                </li>
              ))}

            <Link
              href={`/meals/${mealDoc.id}/shopping-lists`}
              class="fixed bottom-5 right-20 rounded-full border-2 border-pico-primary p-3 shadow-md"
            >
              {icons['plus'].toSvg({ class: 'w-6 h-6 stroke-pico-primary' })}
            </Link>
          </ul>
        ) : (
          <span>{$t('products.noProducts')}</span>
        )}

        {mealDoc.description && <p>{mealDoc.description}</p>}
      </>
    </CardSection>
  );
}
