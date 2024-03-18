import { CardSection } from '@components/sections/CardSection';
import type { ComponentProps } from '@types';

import { IncludedMeals } from './IncludedMeals';
import { type ShoppingListDoc } from '../models/shoppingList';
import { getProductsSum } from '../utils/getProductsSum';

type ShoppingListSectionProps = {
  shoppingListDoc: ShoppingListDoc;
};

export async function ShoppingListSection({ shoppingListDoc }: ComponentProps<ShoppingListSectionProps>) {
  return (
    <CardSection
      entityId={shoppingListDoc.id}
      entityName={shoppingListDoc.name}
      basePath="shopping-lists"
      products={getProductsSum(shoppingListDoc)}
    >
      {shoppingListDoc.meals.length > 0 ? <IncludedMeals meals={shoppingListDoc.meals} /> : <></>}
    </CardSection>
  );
}
