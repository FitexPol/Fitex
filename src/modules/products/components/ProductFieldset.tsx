import { icons } from 'feather-icons';

import { Button } from '@components/Button';
import { Input } from '@components/inputs/Input';
import { Select, type SelectOption } from '@components/inputs/Select';
import { type ComponentProps, type Form } from '@types';
import { $t } from '@utils/$t';
import { Unit } from '@vars';

import { type ProductDoc } from '../models/product';

const _t = $t('products');
const _tShared = $t('_shared');

export const form = {
  product: {
    type: 'text',
    name: 'products[].productId',
    validators: {
      required: true,
      message: 'Product is required',
    },
  },
  quantity: {
    type: 'number',
    name: 'products[].quantity',
    validators: {
      required: true,
      min: 1,
      message: 'Must be at least 1',
    },
  },
  unit: {
    type: 'text',
    name: 'products[].unit',
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
  productOptions: SelectOption[];
  productDoc?: ProductDoc;
  quantity?: number;
  unit?: string;
};

export function ProductFieldset({
  productOptions,
  productDoc,
  quantity,
  unit,
}: ComponentProps<ProductFieldsetProps>) {
  return (
    <fieldset class="grid !grid-cols-12 gap-x-1 border-b border-solid border-b-pico-muted pb-6 md:mb-0 md:border-none md:pb-0">
      <Select
        control={form.product}
        value={productDoc?.id}
        label={_tShared('_shared.forms.name')}
        options={productOptions}
        class="col-span-12 md:col-span-6"
      />

      <Input
        control={form.quantity}
        value={quantity?.toString() ?? '1'}
        label={_tShared('_shared.forms.quantity')}
        class="col-span-6 md:col-span-2"
      />

      <Select
        control={form.unit}
        value={unit}
        options={unitOptions}
        label={_t('productFieldset.unit')}
        class="col-span-6 md:col-span-3"
      />

      <Button class="pico-reset col-span-12 !m-auto h-fit w-fit md:col-span-1" onclick="removeRow(this)">
        {icons.trash.toSvg()}
      </Button>
    </fieldset>
  );
}