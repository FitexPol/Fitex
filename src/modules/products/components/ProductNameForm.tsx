import { icons } from 'feather-icons';

import { type JWTUser } from '@auth/models/user';
import { Button } from '@components/Button';
import { Input } from '@components/inputs/Input';
import { Meal } from '@meals/models/meal';
import type { ComponentProps, Datalist, Form } from '@types';
import { $t } from '@utils/$t';

const _t = $t('products');

export const form = {
  product: {
    type: 'text',
    name: 'name',
    placeholder: 'products.productNameForm.placeholder',
    validators: {
      required: true,
      message: 'Product name is required',
    },
  },
} satisfies Form;

type ProductNameFormProps = {
  user: JWTUser;
};

export async function ProductNameForm({ user }: ComponentProps<ProductNameFormProps>) {
  const meals = await Meal.find({ author: user.id });

  const productsDatalist: Datalist = {
    id: 'products-datalist',
    options: meals.reduce(
      (acc, { products }) => [...acc, ...products.map(({ name }) => name)],
      [] as string[],
    ),
  };

  return (
    <form
      class="grid !grid-cols-12"
      hx-get="/api/products/fieldset"
      hx-target="#products"
      hx-swap="beforeend"
      hx-on--after-request="this.reset()"
      hx-indicator="#loader"
    >
      <Input
        control={form.product}
        label={_t('productNameForm.label')}
        datalist={productsDatalist}
        class="col-span-11"
      />

      <Button type="submit" class="pico-reset col-span-1 !m-auto h-fit !w-fit">
        {icons['plus-circle'].toSvg()}
      </Button>
    </form>
  );
}
