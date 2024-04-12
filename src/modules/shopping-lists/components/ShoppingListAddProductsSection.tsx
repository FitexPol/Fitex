import { type JWTUser } from '@auth/models/user';
import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Icon } from '@components/Icon';
import { AddProductsSection } from '@components/sections/AddProductsSection';
import { Meal } from '@meals/models/meal';
import { type Tab } from '@types';
import { $t } from '@utils/$t';
import { getPath } from '@utils/getPath';
import { getRoundedQuantity } from '@utils/getRoundedQuantity';

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
            <Card class="rounded-md bg-pico-muted">
              <Button
                class="pico-reset flex w-full items-center justify-between !text-left !text-lg"
                onclick="toggleAccordionItem(this)"
              >
                {Html.escapeHtml(mealDoc.name)}
                <Icon type="chevron-down" />
              </Button>

              <ul class="mb-0 mt-6 hidden">
                {mealDoc.products.map(({ name, quantity, unit }) => (
                  <li class="mb-2 flex gap-2">
                    <Button
                      class="pico-reset"
                      hx-put={`/api/shopping-lists/${shoppingListDoc.id}/products`}
                      hx-vals={JSON.stringify({ name, quantity, unit })}
                      hx-swap="none"
                    >
                      <Icon type="plus-circle" class="size-5" />
                    </Button>

                    <span safe>{`${name} - ${getRoundedQuantity(quantity)}${unit}`}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </li>
        ))}
    </ul>
  );
}
