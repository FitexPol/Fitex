import { icons } from 'feather-icons';

import { Button } from '@components/Button';
import { Input } from '@components/inputs/Input';
import { Select, type SelectOption } from '@components/inputs/Select';
import type { ComponentProps, Form } from '@types';
import { $t } from '@utils/$t';

import type { Product } from '../models/product';
import { Unit } from '../models/product';

const _t = $t('products');

export const form = {
  name: {
    type: 'text',
    name: 'name',
    validators: {
      required: true,
      message: 'Product name is required',
    },
  },
  quantity: {
    type: 'number',
    name: 'quantity',
    validators: {
      required: true,
      min: 1,
      message: 'Must be at least 1',
    },
  },
  unit: {
    type: 'text',
    name: 'unit',
    validators: {
      required: true,
      message: 'Unit is required',
    },
  },
} satisfies Form;

const unitOptions: SelectOption[] = Object.values(Unit).map((unit) => ({
  value: unit,
  label: unit,
}));

type ProductFieldsetProps = {
  product: Product;
};

export function ProductFieldset({ product }: ComponentProps<ProductFieldsetProps>) {
  return (
    <form class="border-b border-solid border-b-pico-muted pb-6 md:mb-0 md:border-none md:pb-0">
      <fieldset class="grid !grid-cols-12 gap-x-1">
        <Input
          control={form.name}
          value={product.name}
          label={_t('productForm.name')}
          class="col-span-12 md:col-span-6"
        />

        <Input
          control={form.quantity}
          value={product.quantity.toString() ?? '1'}
          label={_t('productForm.quantity')}
          step=".1"
          class="col-span-6 md:col-span-2"
        />

        <Select
          control={form.unit}
          value={product.unit}
          options={unitOptions}
          label={_t('productForm.unit')}
          class="col-span-6 md:col-span-3"
        />

        <Button class="pico-reset col-span-12 !m-auto h-fit w-fit md:col-span-1" onclick="removeRow(this)">
          {icons.trash.toSvg()}
        </Button>
      </fieldset>
    </form>
  );
}
