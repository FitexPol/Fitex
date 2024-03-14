import { icons } from 'feather-icons';

import { type JWTUser } from '@auth/models/user';
import { Button } from '@components/Button';
import { Select } from '@components/inputs/Select';
import { EditSection } from '@components/sections/EditSection';
import { getMealOptions } from '@meals/utils/getMealOptions';
import type { ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { MealsTable } from './MealsTable';
import { addMealForm } from '../forms/add-meal';
import { type ShoppingListDoc } from '../models/shoppingList';

const _t = $t('shoppingLists');

type ShoppingListEditSectionProps = {
  user: JWTUser;
  shoppingListDoc: ShoppingListDoc;
};

export async function ShoppingListEditSection({
  user,
  shoppingListDoc,
}: ComponentProps<ShoppingListEditSectionProps>) {
  const mealOptions = await getMealOptions(user);

  return (
    <EditSection
      title={_t('shoppingListEditSection.title')}
      basePath="shopping-lists"
      entity={shoppingListDoc}
      basicInformation={[{ label: 'Nazwa', value: shoppingListDoc.name }]}
      user={user}
    >
      <EditSection.Group title={_t('shoppingListEditSection.meals')}>
        <>
          <form
            class="mt-2 grid !grid-cols-12"
            hx-post={`/api/shopping-lists/${shoppingListDoc.id}/meals`}
            hx-target="#meals"
            hx-swap="outerHTML"
            hx-on--after-request="this.reset()"
            hx-indicator="#loader"
          >
            <Select
              control={addMealForm.mealId}
              label={_t('shoppingListEditSection.addMeal.label')}
              options={mealOptions}
              class="col-span-10 sm:col-span-11"
            />

            <Button type="submit" class="pico-reset col-span-2 !m-auto h-fit !w-fit sm:col-span-1">
              {icons['plus-circle'].toSvg()}
            </Button>
          </form>

          <MealsTable shoppingListDoc={shoppingListDoc} />
        </>
      </EditSection.Group>
    </EditSection>
  );
}
