import { type JWTUser } from '@auth/models/user';
import { Button } from '@components/Button';
import { Icon } from '@components/Icon';
import { Input } from '@components/inputs/Input';
import { AddProductsSection } from '@components/sections/AddProductsSection';
import { Meal } from '@meals/models/meal';
import { type Tab } from '@types';
import { $t } from '@utils/$t';
import { getPath } from '@utils/getPath';

import { type ShoppingListDoc } from '../models/shoppingList';

type ShoppingListAddProductsSectionProps = {
  user: JWTUser;
  shoppingListDoc: ShoppingListDoc;
  activeTab: 'products' | 'meals';
};

export function ShoppingListAddProductsSection({
  user,
  shoppingListDoc,
  activeTab,
}: ShoppingListAddProductsSectionProps) {
  const additionalTabs = new Map<string, Tab>([
    [
      'meals',
      {
        href: getPath(`/shopping-lists/${shoppingListDoc.id}/products`, { tab: 'meals' }),
        label: $t('meals'),
        component: <MealProducts user={user} shoppingListDoc={shoppingListDoc} />,
      },
    ],
  ]);

  return (
    <AddProductsSection
      user={user}
      entity={shoppingListDoc}
      basePath="shopping-lists"
      activeTab={activeTab}
      additionalTabs={additionalTabs}
    />
  );
}

type MealProductsProps = {
  user: JWTUser;
  shoppingListDoc: ShoppingListDoc;
};

async function MealProducts({ user, shoppingListDoc }: MealProductsProps) {
  const meals = await Meal.find({ author: user.id }).sort({ name: 1 }).exec();

  return (
    <ul class="mt-2">
      {meals
        .filter(({ products }) => products.length > 0)
        .map((mealDoc) => (
          <li>
            <Button
              class="pico-reset flex w-full items-center justify-between !py-3 !text-left !text-lg"
              onclick="toggleAccordionItem(this)"
            >
              {Html.escapeHtml(mealDoc.name)}
              <Icon type="chevron-down" />
            </Button>

            <ul class="mb-0 hidden border-t border-pico-muted pt-2">
              {mealDoc.products.map((product) => (
                <li class="mb-0">
                  <form
                    hx-put={`/api/shopping-lists/${shoppingListDoc.id}/products`}
                    hx-swap="none"
                    class="grid !grid-cols-12 !gap-x-1 sm:!gap-x-4"
                  >
                    <Input
                      control={{ name: 'name', type: 'text' }}
                      value={product.name}
                      class="pointer-events-none col-span-4 mb-0 sm:col-span-7"
                    />

                    <Input
                      control={{ name: 'quantity', type: 'text' }}
                      value={product.quantity?.toString() ?? ''}
                      class="pointer-events-none col-span-3 mb-0 sm:col-span-2"
                    />

                    <Input
                      control={{ name: 'unit', type: 'text' }}
                      value={product.unit}
                      class="pointer-events-none col-span-3 sm:col-span-2"
                    />

                    <Button
                      type="submit"
                      class="pico-reset col-span-2 !m-auto !mt-5 h-fit !w-fit sm:col-span-1"
                    >
                      <Icon type="plus-circle" />
                    </Button>
                  </form>
                </li>
              ))}
            </ul>
          </li>
        ))}
    </ul>
  );
}
