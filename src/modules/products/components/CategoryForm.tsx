import { Button } from '@components/Button';
import { Input } from '@components/inputs/Input';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { type CategoryFormErrors, categoryForm } from '../forms';
import { type CategoryDoc } from '../models/category';

const _t = $t('products');
const _tShared = $t('_shared');

type CategoryFormProps = {
  categoryDoc?: CategoryDoc;
  errors?: CategoryFormErrors;
};

export async function CategoryForm({ categoryDoc, errors }: ComponentProps<CategoryFormProps>) {
  const [method, endpoint] = categoryDoc
    ? ['PATCH', `/api/products/categories/${categoryDoc.id}`]
    : ['POST', '/api/products/categories'];

  return (
    <form onsubmit={`submitCategoryForm(event, '${method}', '${endpoint}', this)`}>
      <Input
        control={categoryForm['pl-PL']}
        value={categoryDoc?.name['pl-PL']}
        label={_t('_shared.pl')}
        error={errors?.['pl-PL']}
      />

      <Button type="submit">{_tShared('_shared.forms.submit')}</Button>
    </form>
  );
}
