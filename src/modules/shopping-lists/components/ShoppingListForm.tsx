import { type JWTUser } from '@auth/models/user';
import { Button } from '@components/Button';
import { Input } from '@components/inputs/Input';
import { MealFieldset } from '@meals/components/MealFieldset';
import { MealNameForm } from '@meals/components/MealNameForm';
import { ProductFieldset } from '@products/components/ProductFieldset';
import { ProductNameForm } from '@products/components/ProductNameForm';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { getPopulatedDoc } from '@utils/getPopulatedDoc';

import { type ShoppingListFormErrors, shoppingListForm } from '../forms';
import { type ShoppingListDoc } from '../models/shoppingList';

const _t = $t('shoppingLists');
const _tShared = $t('_shared');

type ShoppingListFormProps = {
  user: JWTUser;
  shoppingListDoc?: ShoppingListDoc;
  errors?: ShoppingListFormErrors;
};

export function ShoppingListForm({ user, shoppingListDoc, errors }: ComponentProps<ShoppingListFormProps>) {
  const [method, endpoint] = shoppingListDoc
    ? ['PATCH', `/api/shopping-lists/${shoppingListDoc.id}`]
    : ['POST', '/api/shopping-lists'];

  return (
    <>
      <form id="shopping-list-details-form" onsubmit="event.preventDefault()">
        <Input
          control={shoppingListForm.name}
          value={shoppingListDoc?.name}
          label={_tShared('_shared.forms.name')}
          error={errors?.name}
        />
      </form>

      <span class="mb-4 block text-lg font-medium">{_tShared('_shared.products')}:</span>

      <ProductNameForm user={user} />

      <ul id="products">
        {shoppingListDoc?.products.map((product) => (
          <li>
            <ProductFieldset product={product} />
          </li>
        ))}
      </ul>

      <span class="mb-4 block text-lg font-medium">{_t('_shared.meals')}:</span>

      <MealNameForm user={user} />

      <ul id="meals">
        {shoppingListDoc?.meals.map(({ meal, quantity }) => {
          const mealDoc = getPopulatedDoc(meal);

          return (
            <li>
              {mealDoc ? (
                <MealFieldset mealDoc={mealDoc} quantity={quantity} />
              ) : (
                <span>{_tShared('_shared.errors.population')}</span>
              )}
            </li>
          );
        })}
      </ul>

      <Button onclick={`submitShoppingListForm(event, '${method}', '${endpoint}')`}>
        {_tShared('_shared.forms.submit')}
      </Button>
    </>
  );
}
