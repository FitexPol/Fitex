import { icons } from 'feather-icons';

import { Button } from '@components/Button';
import { Input } from '@components/inputs/Input';
import { Textarea } from '@components/inputs/Textarea';
import { ProductFieldset } from '@products/components/ProductFieldset';
import { getProductOptions } from '@products/utils/getProductOptions';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { getPopulatedDoc } from '@utils/getPopulatedDoc';

import { type MealForm, type MealFormErrors, mealForm } from '../forms';
import { type MealDoc } from '../models/meal';

const _t = $t('meals');
const _tShared = $t('_shared');

type MealFormProps = {
  mealDoc?: MealDoc;
  errors?: MealFormErrors;
};

export async function MealForm({ mealDoc, errors }: ComponentProps<MealFormProps>) {
  const productOptions = await getProductOptions();
  const [method, endpoint] = mealDoc ? ['PATCH', `/api/meals/${mealDoc.id}`] : ['POST', '/api/meals'];

  return (
    <form id="meal-form" onsubmit={`submitMealForm(event, '${method}', '${endpoint}', this)`}>
      <Input
        control={mealForm.name}
        value={mealDoc?.name}
        label={_tShared('_shared.forms.name')}
        error={errors?.name}
      />

      <Textarea
        control={mealForm.description}
        value={mealDoc?.description}
        label={_tShared('_shared.forms.description')}
        rows="5"
        error={errors?.description}
      />

      <span class="mb-3 block">{_t('mealForm.products')}:</span>

      <ul id="products">
        {mealDoc ? (
          mealDoc.products.map(({ product, quantity, unit }) => {
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
        hx-target="#products"
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
