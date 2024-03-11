import { icons } from 'feather-icons';

import { type JWTUser } from '@auth/models/user';
import { Button } from '@components/Button';
import { Select } from '@components/inputs/Select';
import type { ComponentProps, Form } from '@types';
import { $t } from '@utils/$t';

import { getMealOptions } from '../utils/getMealOptions';

const _t = $t('meals');

export const form = {
  meal: {
    type: 'text',
    name: 'mealId',
    placeholder: 'meals.mealNameForm.placeholder',
    validators: {
      required: true,
      message: 'Product name is required',
    },
  },
} satisfies Form;

type MealNameFormProps = {
  user: JWTUser;
};

export async function MealNameForm({ user }: ComponentProps<MealNameFormProps>) {
  const mealOptions = await getMealOptions(user);

  return (
    <form
      class="grid !grid-cols-12"
      hx-get="/api/meals/fieldset"
      hx-target="#meals"
      hx-swap="afterbegin"
      hx-on--after-request="this.reset()"
      hx-indicator="#loader"
    >
      <Select
        control={form.meal}
        label={_t('mealNameForm.label')}
        options={mealOptions}
        class="col-span-10 sm:col-span-11"
      />

      <Button type="submit" class="pico-reset col-span-2 !m-auto h-fit !w-fit sm:col-span-1">
        {icons['plus-circle'].toSvg()}
      </Button>
    </form>
  );
}
