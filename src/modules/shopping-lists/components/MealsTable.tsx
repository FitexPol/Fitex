import { icons } from 'feather-icons';

import { Button } from '@components/Button';
import { Link } from '@components/Link';
import { Table } from '@components/Table';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { getPath } from '@utils/getPath';
import { getPopulatedDoc } from '@utils/getPopulatedDoc';

import { type ShoppingListDoc } from '../models/shoppingList';

const _tShared = $t('_shared');

type MealsTableProps = {
  shoppingListDoc: ShoppingListDoc;
};

export function MealsTable({ shoppingListDoc }: ComponentProps<MealsTableProps>) {
  return (
    <Table id="meals">
      <>
        <Table.Header>
          <>
            <Table.Header.Item>{_tShared('_shared.forms.name')}</Table.Header.Item>
            <Table.Header.Item>{_tShared('_shared.forms.quantity')}</Table.Header.Item>
            <Table.Header.Item>{_tShared('_shared.actions')}</Table.Header.Item>
          </>
        </Table.Header>

        <Table.Body>
          <>
            {shoppingListDoc.meals.map(({ meal, quantity }) => {
              const mealDoc = getPopulatedDoc(meal);

              return (
                <Table.Body.Row firstItem={<Link href={`/meals/${mealDoc?.id}`}>{mealDoc?.name}</Link>}>
                  <>
                    <Table.Body.Row.Cell>
                      <>{quantity}</>
                    </Table.Body.Row.Cell>

                    <Table.Body.Row.Cell>
                      <div class="flex items-center gap-2">
                        <Link
                          href={getPath(`/shopping-lists/${shoppingListDoc.id}/meal-form`, {
                            mealId: mealDoc?.id,
                          })}
                        >
                          {icons['edit'].toSvg()}
                        </Link>

                        <Button
                          class="pico-reset !text-inherit"
                          hx-delete={`/api/shopping-lists/${shoppingListDoc.id}/meals/${mealDoc?.id}`}
                          hx-target="#meals"
                          hx-swap="outerHTML"
                          hx-confirm={_tShared('_shared.deletionConfirmation')}
                          hx-indicator="#loader"
                        >
                          {icons.trash.toSvg()}
                        </Button>
                      </div>
                    </Table.Body.Row.Cell>
                  </>
                </Table.Body.Row>
              );
            })}
          </>
        </Table.Body>
      </>
    </Table>
  );
}
