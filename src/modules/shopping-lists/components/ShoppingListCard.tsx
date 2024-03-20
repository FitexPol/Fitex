import { CardsSection } from '@components/sections/CardsSection';
import { type ComponentProps } from '@types';

import { ShoppingListCardProducts } from './ShoppingListCardProducts';
import { type ShoppingListDoc } from '../models/shoppingList';

type ShoppingListCardProps = {
  shoppingListDoc: ShoppingListDoc;
};

export function ShoppingListCard({ shoppingListDoc }: ComponentProps<ShoppingListCardProps>) {
  return (
    <CardsSection.Item entity={shoppingListDoc} basePath="shopping-lists">
      <ShoppingListCardProducts shoppingListDoc={shoppingListDoc} />
    </CardsSection.Item>
  );
}
