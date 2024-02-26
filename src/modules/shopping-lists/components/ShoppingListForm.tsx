import { icons } from 'feather-icons';

import { Button } from '@components/Button';
import { Input } from '@components/inputs/Input';
import { type SelectOption } from '@components/inputs/Select';
import { MealFieldset } from '@meals/components/MealFieldset';
import { ProductFieldset } from '@products/components/ProductFieldset';
import { getProductOptions } from '@products/utils/getProductOptions';
import { type ComponentProps, type JWTUser } from '@types';
import { $t } from '@utils/$t';
import { getPopulatedDoc } from '@utils/getPopulatedDoc';

import { getMealOptions } from '../../meals/utils/getMealOptions';
import { type ShoppingListFormErrors, shoppingListForm } from '../forms';
import { type ShoppingListDoc } from '../models/shoppingList';

const _t = $t('shoppingLists');
const _tShared = $t('_shared');

type ShoppingListFormProps = {
  user: JWTUser;
  shoppingListDoc?: ShoppingListDoc;
  errors?: ShoppingListFormErrors;
};

export async function ShoppingListForm({
  user,
  shoppingListDoc,
  errors,
}: ComponentProps<ShoppingListFormProps>) {
  const mealOptions: SelectOption[] = await getMealOptions(user);
  const productOptions = await getProductOptions();
  const [method, endpoint] = shoppingListDoc
    ? ['PATCH', `/api/shopping-lists/${shoppingListDoc.id}`]
    : ['POST', '/api/shopping-lists'];

  return (
    <form
      id="shopping-list-form"
      onsubmit={`submitShoppingListForm(event, '${method}', '${endpoint}', this)`}
    >
      <Input control={shoppingListForm.name} value={shoppingListDoc?.name} error={errors?.name} />

      <span class="mb-2 block">{_t('_shared.meals')}:</span>

      <ul id="meals">
        {shoppingListDoc ? (
          shoppingListDoc.meals.map(({ meal, quantity }) => {
            const mealDoc = getPopulatedDoc(meal);

            return (
              <li>
                {mealDoc ? (
                  <MealFieldset mealOptions={mealOptions} mealDoc={mealDoc} quantity={quantity} />
                ) : (
                  <span>{_tShared('_shared.errors.population')}</span>
                )}
              </li>
            );
          })
        ) : (
          <li>
            <MealFieldset mealOptions={mealOptions} />
          </li>
        )}
      </ul>

      <Button
        type="button"
        class="mx-auto mb-5 w-auto border-none"
        hx-get="/api/shopping-lists/meal-fieldset"
        hx-target="#meals"
        hx-swap="beforeend"
      >
        {icons['plus-circle'].toSvg()}
      </Button>

      <span class="mb-2 block">{_t('_shared.additionalProducts')}:</span>

      <ul id="additional-products">
        {shoppingListDoc ? (
          shoppingListDoc.additionalProducts.map(({ product, quantity, unit }) => {
            const productDoc = getPopulatedDoc(product);

            return (
              <li>
                {productDoc ? (
                  <ProductFieldset
                    productOptions={productOptions}
                    productDoc={productDoc}
                    quantity={quantity}
                    unit={unit}
                  />
                ) : (
                  <span>{_tShared('_shared.errors.population')}</span>
                )}
              </li>
            );
          })
        ) : (
          <li>
            <ProductFieldset productOptions={productOptions} />
          </li>
        )}
      </ul>

      <Button
        type="button"
        class="mx-auto mb-5 w-auto border-none"
        hx-get="/api/products/fieldset"
        hx-target="#additional-products"
        hx-swap="beforeend"
      >
        {icons['plus-circle'].toSvg()}
      </Button>

      <Button type="submit" class="contrast">
        {_tShared('_shared.forms.submit')}
      </Button>
    </form>
  );
}
