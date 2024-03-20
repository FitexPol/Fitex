import { CardsSection } from '@components/sections/CardsSection';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { getRoundedQuantity } from '@utils/getRoundedQuantity';

import { type MealDoc } from '../models/meal';

type MealCardProps = {
  mealDoc: MealDoc;
};

export function MealCard({ mealDoc }: ComponentProps<MealCardProps>) {
  return (
    <CardsSection.Item entity={mealDoc} basePath="meals">
      {mealDoc.products.length > 0 ? (
        <ul>
          {mealDoc.products
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(({ name, quantity, unit }) => (
              <li>
                {name} - {getRoundedQuantity(quantity)} {unit}
              </li>
            ))}
        </ul>
      ) : (
        <span>{$t('products.noProducts')}</span>
      )}
    </CardsSection.Item>
  );
}
