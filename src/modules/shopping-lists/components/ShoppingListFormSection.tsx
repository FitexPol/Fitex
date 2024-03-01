import { type JWTUser } from '@auth/models/user';
import { Card } from '@components/Card';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { ShoppingListForm } from './ShoppingListForm';
import { ShoppingList } from '../models/shoppingList';

const _t = $t('shoppingLists');

type ShoppingListFormSectionProps = {
  user: JWTUser;
  shoppingListId?: string;
};

export async function ShoppingListFormSection({
  user,
  shoppingListId,
}: ComponentProps<ShoppingListFormSectionProps>) {
  if (!shoppingListId) {
    return (
      <Section title={_t('shoppingListFormSection.title')}>
        <ShoppingListForm user={user} />
      </Section>
    );
  }

  const shoppingListDoc = await ShoppingList.findById(shoppingListId)
    .populate('meals.meal')
    .populate('products.product')
    .exec();

  if (!shoppingListDoc) {
    return <span>{_t('_shared.errors.notFound')}</span>;
  }

  if (!shoppingListDoc.author._id.equals(user.id)) {
    return <span>{_t('_shared.errors.permissionDenied')}</span>;
  }

  return (
    <Section title={shoppingListDoc.name}>
      <ShoppingListForm user={user} shoppingListDoc={shoppingListDoc} />
    </Section>
  );
}

type SectionProps = {
  title: string;
};

function Section({ title, children }: ComponentProps<SectionProps>) {
  return (
    <section id="shopping-list-form-section">
      <Card>
        <>
          <Card.Header title={<h1 class="mb-0 text-2xl">{title}</h1>} />
          {children}
        </>
      </Card>
    </section>
  );
}
