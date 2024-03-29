import { type JWTUser } from '@auth/models/user';
import { Button } from '@components/Button';
import { Input } from '@components/inputs/Input';
import { Select } from '@components/inputs/Select';
import { $t } from '@utils/$t';

import { type UpdateProductFormErrors, updateProductForm } from '../../forms/updateProduct';
import { type ProductDoc } from '../../models/product';
import { Unit } from '../../models/product';
import { getMostUsedProductNames } from '../../utils/getMostUsedProductNames';

type UpdateProductFormProps = {
  user: JWTUser;
  productDoc: ProductDoc;
  endpoint: string;
  errors?: UpdateProductFormErrors;
};

export async function UpdateProductForm({ user, productDoc, endpoint, errors }: UpdateProductFormProps) {
  const productNames = await getMostUsedProductNames(user);

  return (
    <form hx-patch={endpoint}>
      <Input
        control={updateProductForm.name}
        value={productDoc.name}
        label={$t('_name')}
        datalist={{ id: 'products-datalist', options: productNames }}
        error={errors?.name}
      />

      <Input
        control={updateProductForm.quantity}
        value={productDoc.quantity?.toString() ?? ''}
        label={$t('_quantity')}
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
        label={$t('_unit')}
        error={errors?.unit}
      />

      <Button type="submit">{$t('_submit')}</Button>
    </form>
  );
}
