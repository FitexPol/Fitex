import { icons } from 'feather-icons';

import { type JWTUser } from '@auth/models/user';
import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { ShoppingList } from '@shopping-lists/models/shoppingList';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { getPath } from '@utils/getPath';

type ShoppingListsSectionProps = {
  user: JWTUser;
  mealId: string;
};

export async function ShoppingListsSection({ user, mealId }: ComponentProps<ShoppingListsSectionProps>) {
  const shoppingListDocs = await ShoppingList.find({ author: user.id });

  return (
    <section>
      <Card>
        <>
          <Card.Header title={<h1>{$t('meals.addToShoppingList')}</h1>} />

          <ul>
            {shoppingListDocs.map(({ id, name }) => (
              <li class="rounded-md bg-pico-background p-2 shadow-sm">
                <Button
                  hx-put={getPath(`/api/shopping-lists/${id}/products`, { mealId })}
                  class="pico-reset inline-flex w-full items-center justify-between"
                >
                  <>
                    {name} {icons['plus-circle'].toSvg()}
                  </>
                </Button>
              </li>
            ))}
          </ul>
        </>
      </Card>
    </section>
  );
}
