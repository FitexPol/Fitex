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
  query: Record<string, string | undefined>;
};

export async function ShoppingListsSection({
  user,
  mealId,
  query,
}: ComponentProps<ShoppingListsSectionProps>) {
  const shoppingListDocs = await ShoppingList.find({ author: user.id });

  return (
    <section>
      <Card>
        <>
          <Card.Header title={<h1 class="text-xl">{$t('meals.chooseShoppingList')}</h1>} />

          <ul>
            {shoppingListDocs.map(({ id, name }) => (
              <li class="rounded-md bg-pico-background p-2 shadow-sm">
                <Button
                  class="pico-reset inline-flex w-full items-center justify-between"
                  hx-put={getPath(`/api/shopping-lists/${id}/products`, { mealId, ...query })}
                  hx-indicator="#loader"
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
