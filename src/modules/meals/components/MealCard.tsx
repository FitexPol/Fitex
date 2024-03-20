import { Checkbox } from '@components/inputs/Checkbox';
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
        <form
          id={`products-form-${mealDoc.id}`}
          hx-get={`/api/meals/${mealDoc.id}/shopping-lists`}
          hx-indicator="#loader"
          class="mb-4"
        >
          {mealDoc.products
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(({ id, name, quantity, unit }) => (
              <Checkbox name={id}>
                <>
                  {name} - {getRoundedQuantity(quantity)} {unit}
                </>
              </Checkbox>
            ))}
        </form>
      ) : (
        <span>{$t('products.noProducts')}</span>
      )}
    </CardsSection.Item>
  );
}
