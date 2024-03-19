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
                  <label>
                    <input type="checkbox" name={name} />
                    {name} - {getRoundedQuantity(quantity)} {unit}
                  </label>
                </li>
              ))}
          </ul>
        ) : (
          <span>{$t('products.noProducts')}</span>
        )}

        {mealDoc.description && <p>{mealDoc.description}</p>}
      </>
    </CardSection>
  );
}
