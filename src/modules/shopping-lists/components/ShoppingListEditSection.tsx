import { EditSection } from '@components/sections/EditSection';
import type { ComponentProps } from '@types';

import { type ShoppingListDoc } from '../models/shoppingList';

type ShoppingListEditSectionProps = {
  shoppingListDoc: ShoppingListDoc;
};

export async function ShoppingListEditSection({
  shoppingListDoc,
}: ComponentProps<ShoppingListEditSectionProps>) {
  return <EditSection title={shoppingListDoc.name} basePath="shopping-lists" entity={shoppingListDoc} />;
}
