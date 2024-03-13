import { Card } from '@components/Card';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { type ShoppingListDoc } from '../models/shoppingList';

const _t = $t('shoppingLists');

type ShoppingListFormSectionProps = {
  shoppingListDoc?: ShoppingListDoc;
};

export async function ShoppingListFormSection({
  shoppingListDoc,
  children,
}: ComponentProps<ShoppingListFormSectionProps>) {
  return (
    <section id="shopping-list-form-section">
      <Card>
        <>
          <Card.Header
            title={
              <h1 class="mb-0 text-2xl">
                {shoppingListDoc ? shoppingListDoc.name : _t('shoppingListFormSection.title')}
              </h1>
            }
          />
          {children}
        </>
      </Card>
    </section>
  );
}
