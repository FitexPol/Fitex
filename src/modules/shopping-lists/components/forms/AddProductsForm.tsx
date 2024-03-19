import { Button } from '@components/Button';
import { Input } from '@components/inputs/Input';
import { Select } from '@components/inputs/Select';
import { addProductForm } from '@forms/addProduct';
import { type ProductDoc, Unit } from '@models/product';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';

type AddProductsFormProps = {
  shoppingListId: string;
  products: ProductDoc[];
};

export function AddProductsForm({ shoppingListId, products }: ComponentProps<AddProductsFormProps>) {
  return (
    <form hx-put={`/api/shopping-lists/${shoppingListId}/products`}>
      {products.map(({ name, quantity, unit }, i) => (
        <fieldset class="grid !grid-cols-12 border-b border-solid border-b-pico-muted last-of-type:border-none md:mb-0 md:border-none">
          <Input
            control={{
              name: `name-${i}`,
              type: 'text',
              validators: addProductForm.name.validators,
            }}
            label={$t('_name')}
            value={name}
            class="col-span-12 md:col-span-8"
          />

          <Input
            control={{ name: `quantity-${i}`, type: 'number' }}
            label={$t('_quantity')}
            value={quantity?.toString() ?? ''}
            class="col-span-6 md:col-span-2"
          />

          <Select
            control={{ name: `unit-${i}`, type: 'text' }}
            options={Object.values(Unit).map((unit) => ({
              value: unit,
              label: unit,
            }))}
            label={$t('_unit')}
            value={unit}
            class="col-span-6 md:col-span-2"
          />
        </fieldset>
      ))}

      <Button type="submit">{$t('_submit')}</Button>
    </form>
  );
}
