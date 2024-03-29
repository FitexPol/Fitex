import { CardsSection } from '@components/sections/CardsSection';

import { ShoppingListCardProducts } from './ShoppingListCardProducts';
import { type ShoppingListDoc } from '../models/shoppingList';

type ShoppingListCardProps = {
  shoppingListDoc: ShoppingListDoc;
};

export function ShoppingListCard({ shoppingListDoc }: ShoppingListCardProps) {
  return (
    <CardsSection.Item entity={shoppingListDoc} basePath="shopping-lists">
      <ShoppingListCardProducts shoppingListDoc={shoppingListDoc} />
    </CardsSection.Item>
  );
}
