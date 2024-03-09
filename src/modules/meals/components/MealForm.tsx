import { type JWTUser } from '@auth/models/user';
import { Button } from '@components/Button';
import { Input } from '@components/inputs/Input';
import { Textarea } from '@components/inputs/Textarea';
import { ProductFieldset } from '@products/components/ProductFieldset';
import { ProductNameForm } from '@products/components/ProductNameForm';
import type { ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { type MealForm, type MealFormErrors, mealForm } from '../forms';
import { type MealDoc } from '../models/meal';

const _tShared = $t('_shared');

type MealFormProps = {
  user: JWTUser;
  mealDoc?: MealDoc;
  errors?: MealFormErrors;
};

export function MealForm({ user, mealDoc, errors }: ComponentProps<MealFormProps>) {
  const [method, endpoint] = mealDoc ? ['PATCH', `/api/meals/${mealDoc.id}`] : ['POST', '/api/meals'];

  return (
    <>
      <form id="meal-details-form" onsubmit="event.preventDefault()">
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
      </form>

      <span class="mb-4 block text-lg font-medium">{_tShared('_shared.products')}:</span>

      <ProductNameForm user={user} />

      <ul id="products">
        {mealDoc?.products.map((product) => (
          <li>
            <ProductFieldset product={product} />
          </li>
        ))}
      </ul>

      <Button onclick={`submitMealForm(event, '${method}', '${endpoint}')`}>
        {_tShared('_shared.forms.submit')}
      </Button>
    </>
  );
}
