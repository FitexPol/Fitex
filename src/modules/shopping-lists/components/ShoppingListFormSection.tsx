import { type User } from '@auth/models/user';
import { Card } from '@components/Card';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { ShoppingListForm } from './ShoppingListForm';
import { ShoppingList } from '../models/shoppingList';

const _t = $t('shoppingLists');

type ShoppingListFormSectionProps = {
  user: User;
  shoppingListId?: string;
};

export async function ShoppingListFormSection({
  user,
  shoppingListId,
}: ComponentProps<ShoppingListFormSectionProps>) {
  if (!shoppingListId) {
    return (
      <Section title={_t('shoppingListFormSection.title')}>
        <ShoppingListForm />
      </Section>
    );
  }

  const shoppingListDoc = await ShoppingList.findById(shoppingListId).exec();

  if (!shoppingListDoc) {
    return <span>{_t('_shared.notFound')}</span>;
  }

  if (!shoppingListDoc.author._id.equals(user.id)) {
    return <span>{_t('shoppingListFormSection.permissionDenied')}</span>;
  }

  return (
    <Section title={shoppingListDoc.name}>
      <ShoppingListForm shoppingList={shoppingListDoc} />
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
          <Card.Header title={title} />
          {children}
        </>
      </Card>
    </section>
  );
}
