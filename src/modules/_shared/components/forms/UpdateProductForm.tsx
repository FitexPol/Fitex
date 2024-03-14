import { Button } from '@components/Button';
import { Input } from '@components/inputs/Input';
import { Select } from '@components/inputs/Select';
import type { ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { type UpdateProductFormErrors, updateProductForm } from '../../forms/update-product';
import { type ProductDoc } from '../../models/product';
import { Unit } from '../../models/product';

const _tShared = $t('_shared');

type UpdateProductFormProps = {
  productDoc: ProductDoc;
  endpoint: string;
  errors?: UpdateProductFormErrors;
};

export function UpdateProductForm({ productDoc, endpoint, errors }: ComponentProps<UpdateProductFormProps>) {
  return (
    <form hx-patch={endpoint}>
      <Input
        control={updateProductForm.name}
        value={productDoc.name}
        label={_tShared('_shared.forms.name')}
        error={errors?.name}
      />

      <Input
        control={updateProductForm.quantity}
        value={productDoc.quantity?.toString() ?? ''}
        label={_tShared('_shared.forms.quantity')}
        step=".1"
        error={errors?.quantity}
      />

      <Select
        control={updateProductForm.unit}
        value={productDoc.unit}
        options={Object.values(Unit).map((unit) => ({
          value: unit,
          label: unit,
        }))}
        label={_tShared('_shared.unit')}
        error={errors?.unit}
      />

      <Button type="submit">{_tShared('_shared.forms.submit')}</Button>
    </form>
  );
}
