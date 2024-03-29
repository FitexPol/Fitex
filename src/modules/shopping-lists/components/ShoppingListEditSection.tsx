import { EditSection } from '@components/sections/EditSection';

import { type ShoppingListDoc } from '../models/shoppingList';

type ShoppingListEditSectionProps = {
  shoppingListDoc: ShoppingListDoc;
};

export async function ShoppingListEditSection({ shoppingListDoc }: ShoppingListEditSectionProps) {
  return <EditSection title={shoppingListDoc.name} basePath="shopping-lists" entity={shoppingListDoc} />;
}
