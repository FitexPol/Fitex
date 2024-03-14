import { icons } from 'feather-icons';

import { type JWTUser } from '@auth/models/user';
import { Button } from '@components/Button';
import { Input } from '@components/inputs/Input';
import { Meal } from '@meals/models/meal';
import type { ComponentProps, Datalist } from '@types';
import { $t } from '@utils/$t';
import { $tm } from '@utils/$tm';

import { addProductForm } from '../../forms/add-product';

const _t = $t('products');

type AddProductFormProps = {
  user: JWTUser;
  endpoint: string;
};

export async function AddProductForm({
  user,
  endpoint,
  class: className,
}: ComponentProps<AddProductFormProps>) {
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
      class={$tm('grid !grid-cols-12', className)}
      hx-post={endpoint}
      hx-target="#products"
      hx-swap="outerHTML"
      hx-on--after-request="this.reset()"
      hx-indicator="#loader"
    >
      <Input
        control={addProductForm.name}
        label={_t('addProduct.label')}
        datalist={productsDatalist}
        class="col-span-10 sm:col-span-11"
      />

      <Button type="submit" class="pico-reset col-span-2 !m-auto h-fit !w-fit sm:col-span-1">
        {icons['plus-circle'].toSvg()}
      </Button>
    </form>
  );
}
