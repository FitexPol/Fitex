import { type JWTUser } from '@auth/models/user';
import { EditSection } from '@components/sections/EditSection';
import type { ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { type ShoppingListDoc } from '../models/shoppingList';

const _t = $t('shoppingLists');

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
      title={_t('shoppingListEditSection.title')}
      basePath="shopping-lists"
      entity={shoppingListDoc}
      basicInformation={[{ label: 'Nazwa', value: shoppingListDoc.name }]}
      user={user}
    />
  );
}
