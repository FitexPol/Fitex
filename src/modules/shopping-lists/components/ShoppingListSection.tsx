import { Types } from 'mongoose';

import { CardSection } from '@components/sections/CardSection';
import type { ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { type ShoppingListDoc } from '../models/shoppingList';
import { getProductsSum } from '../utils/getProductsSum';

type ShoppingListSectionProps = {
  shoppingListDoc: ShoppingListDoc;
};

export async function ShoppingListSection({ shoppingListDoc }: ComponentProps<ShoppingListSectionProps>) {
  const meals = shoppingListDoc.meals.reduce((acc, { meal, quantity }) => {
    if (!meal || meal instanceof Types.ObjectId) return acc;

    const text = quantity > 1 ? `${meal.name} (x${quantity})` : meal.name;

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
          * {$t('includedMeals')}: {meals}
        </small>
      )}
    </CardSection>
  );
}
