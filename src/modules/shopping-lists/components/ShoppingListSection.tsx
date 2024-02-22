import { type User } from '@auth/models/user';
import { Card } from '@components/Card';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { ShoppingList } from '../models/shoppingList';

const _t = $t('shoppingLists');

type ShoppingListSectionProps = {
  user: User;
  shoppingListId: string;
};

export async function ShoppingListSection({
  user,
  shoppingListId,
}: ComponentProps<ShoppingListSectionProps>) {
  const mealDoc = await ShoppingList.findById(shoppingListId).exec();

  if (!mealDoc) {
    return <span>{_t('_shared.notFound')}</span>;
  }

  if (!mealDoc.author._id.equals(user.id)) {
    return <span>{_t('shoppingListSection.permissionDenied')}</span>;
  }

  return (
    <section id="shopping-list-section">
      <Card class="relative">{JSON.stringify(mealDoc)}</Card>
    </section>
  );
}
