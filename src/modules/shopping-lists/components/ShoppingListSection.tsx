import { CardSection } from '@components/sections/CardSection';
import type { ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { getPopulatedDoc } from '@utils/getPopulatedDoc';

import { type ShoppingListDoc } from '../models/shoppingList';
import { getProductsSum } from '../utils/getProductsSum';

const _t = $t('shoppingLists');

type ShoppingListSectionProps = {
  shoppingListDoc: ShoppingListDoc;
};

export async function ShoppingListSection({ shoppingListDoc }: ComponentProps<ShoppingListSectionProps>) {
  const meals = shoppingListDoc.meals.reduce((acc, { meal, quantity }) => {
    const mealDoc = getPopulatedDoc(meal);

    if (!mealDoc) return acc;

    const text = quantity > 1 ? `${mealDoc.name} (x${quantity})` : mealDoc.name;

    return acc.length > 0 ? `${acc}, ${text}` : text;
  }, '');

  return (
    <CardSection
      entityId={shoppingListDoc.id}
      entityName={shoppingListDoc.name}
      basePath="shopping-lists"
      products={getProductsSum(shoppingListDoc)}
    >
      {meals && (
        <small class="text-xs">
          * {_t('_shared.includedMeals')}: {meals}
        </small>
      )}
    </CardSection>
  );
}
