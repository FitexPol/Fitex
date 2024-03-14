import { CardSection } from '@components/sections/CardSection';
import type { ComponentProps } from '@types';

import { type ShoppingListDoc } from '../models/shoppingList';

type ShoppingListSectionProps = {
  shoppingListDoc: ShoppingListDoc;
};

export async function ShoppingListSection({ shoppingListDoc }: ComponentProps<ShoppingListSectionProps>) {
  return <CardSection entity={shoppingListDoc} />;
}
