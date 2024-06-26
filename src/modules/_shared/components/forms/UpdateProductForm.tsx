import { type JWTUser } from '@auth/models/user';
import { Button } from '@components/Button';
import { NumberInput } from '@components/inputs/NumberInput';
import { Select } from '@components/inputs/Select';
import { StringInput } from '@components/inputs/StringInput';
import { $t } from '@utils/$t';

import { updateProductDTO } from '../../dto/updateProduct';
import { type ProductDoc } from '../../models/product';
import { Unit } from '../../models/product';
import { type FormErrors } from '../../types';
import { getMostUsedProductNames } from '../../utils/getMostUsedProductNames';

type UpdateProductFormProps = {
  user: JWTUser;
  productDoc: ProductDoc;
  endpoint: string;
  errors?: FormErrors<typeof updateProductDTO>;
};

export async function UpdateProductForm({ user, productDoc, endpoint, errors }: UpdateProductFormProps) {
  const productNames = await getMostUsedProductNames(user);

  return (
    <form hx-patch={endpoint}>
      <StringInput
        dto={updateProductDTO}
        name="name"
        value={productDoc.name}
        label={$t('_name')}
        datalist={{ id: 'products-datalist', options: productNames }}
        error={errors?.name}
      />

      <NumberInput
        dto={updateProductDTO}
        name="quantity"
        value={productDoc.quantity?.toString() ?? ''}
        label={$t('_quantity')}
        min="0"
        step=".1"
        error={errors?.quantity}
      />

      <Select
        dto={updateProductDTO}
        name="unit"
        value={productDoc.unit}
        options={Object.values(Unit).map((unit) => ({
          value: unit,
          label: unit,
        }))}
        label={$t('_unit')}
        error={errors?.unit}
      />

      <Button type="submit">{Html.escapeHtml($t('_submit'))}</Button>
    </form>
  );
}
