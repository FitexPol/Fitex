import { Button } from '@components/Button';
import { Input } from '@components/inputs/Input';
import { Select } from '@components/inputs/Select';
import type { ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { type UpdateProductFormErrors, updateProductForm } from '../../forms/update-product';
import { type ProductDoc } from '../../models/product';
import { Unit } from '../../models/product';

const _t = $t('products');
const _tShared = $t('_shared');

type UpdateProductProps = {
  productDoc: ProductDoc;
  endpoint: string;
  errors?: UpdateProductFormErrors;
};

export function UpdateProduct({ productDoc, endpoint, errors }: ComponentProps<UpdateProductProps>) {
  return (
    <form hx-patch={endpoint}>
      <Input
        control={updateProductForm.name}
        value={productDoc.name}
        label={_tShared('_shared.forms.name')}
        error={errors?.name}
        class="col-span-12 md:col-span-6"
      />

      <Input
        control={updateProductForm.quantity}
        value={productDoc.quantity?.toString() ?? ''}
        label={_tShared('_shared.forms.quantity')}
        step=".1"
        error={errors?.quantity}
        class="col-span-6 md:col-span-2"
      />

      <Select
        control={updateProductForm.unit}
        value={productDoc.unit}
        options={Object.values(Unit).map((unit) => ({
          value: unit,
          label: unit,
        }))}
        label={_t('_shared.unit')}
        error={errors?.unit}
        class="col-span-6 md:col-span-3"
      />

      <Button type="submit">{_tShared('_shared.forms.submit')}</Button>
    </form>
  );
}
