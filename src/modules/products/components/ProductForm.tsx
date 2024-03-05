import { Button } from '@components/Button';
import { Input } from '@components/inputs/Input';
import { Select, type SelectOption } from '@components/inputs/Select';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { getPopulatedDoc } from '@utils/getPopulatedDoc';

import { type ProductFormErrors, productForm } from '../forms';
import { type ProductDoc } from '../models/product';
import { getCategoryOptions } from '../utils/getCategoryOptions';

const _t = $t('products');
const _tShared = $t('_shared');

type ProductFormProps = {
  productDoc?: ProductDoc;
  errors?: ProductFormErrors;
};

export async function ProductForm({ productDoc, errors }: ComponentProps<ProductFormProps>) {
  const categoryOptions: SelectOption[] = await getCategoryOptions();
  const categoryDoc = getPopulatedDoc(productDoc?.category);

  const [method, endpoint] = productDoc
    ? ['PATCH', `/api/products/${productDoc.id}`]
    : ['POST', '/api/products'];

  return (
    <form onsubmit={`submitProductForm(event, '${method}', '${endpoint}', this)`}>
      <Input
        control={productForm['pl-PL']}
        value={productDoc?.name['pl-PL']}
        label={_t('_shared.pl')}
        error={errors?.['pl-PL']}
      />

      <Select
        control={productForm.category}
        options={categoryOptions}
        value={categoryDoc?.id}
        label={_t('_shared.category')}
        error={errors?.category}
      />

      <Button type="submit">{_tShared('_shared.forms.submit')}</Button>
    </form>
  );
}
