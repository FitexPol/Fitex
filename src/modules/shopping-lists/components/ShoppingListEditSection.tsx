import { type JWTUser } from '@auth/models/user';
import { EditSection } from '@components/sections/EditSection';
import type { ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { type ShoppingListDoc } from '../models/shoppingList';

type ShoppingListEditSectionProps = {
  user: JWTUser;
  shoppingListDoc: ShoppingListDoc;
};

export async function ShoppingListEditSection({
  user,
  shoppingListDoc,
}: ComponentProps<ShoppingListEditSectionProps>) {
  return (
    <EditSection
      title={$t('shoppingLists.shoppingListEditSection.title')}
      basePath="shopping-lists"
      entity={shoppingListDoc}
      basicInformation={[{ label: $t('_name'), value: shoppingListDoc.name }]}
      user={user}
    />
  );
}
