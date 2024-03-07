import { icons } from 'feather-icons';

import { Button } from '@components/Button';
import { Input } from '@components/inputs/Input';
import { Textarea } from '@components/inputs/Textarea';
import { ProductFieldset } from '@components/ProductFieldset';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { type MealForm, type MealFormErrors, mealForm } from '../forms';
import { type MealDoc } from '../models/meal';

const _t = $t('meals');
const _tShared = $t('_shared');

type MealFormProps = {
  mealDoc?: MealDoc;
  errors?: MealFormErrors;
};

export async function MealForm({ mealDoc, errors }: ComponentProps<MealFormProps>) {
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

      <span class="mb-4 block text-lg font-medium">{_t('mealForm.products')}:</span>

      <ul id="products">
        {mealDoc ? (
          mealDoc.products.map((product) => (
            <li>
              <ProductFieldset productOptions={[]} product={product} />
            </li>
          ))
        ) : (
          <li>
            <ProductFieldset productOptions={[]} />
          </li>
        )}
      </ul>

      <Button
        type="button"
        class="pico-reset !mx-auto !mb-8 block"
        hx-get="/api/products/fieldset"
        hx-target="#products"
        hx-swap="beforeend"
      >
        {icons['plus-circle'].toSvg()}
      </Button>

      <Button type="submit">{_tShared('_shared.forms.submit')}</Button>
    </form>
  );
}
