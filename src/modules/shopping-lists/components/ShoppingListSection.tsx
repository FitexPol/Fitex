import { CardSection } from '@components/sections/CardSection';
import type { ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { getRoundedQuantity } from '@utils/getRoundedQuantity';

import { type ShoppingListDoc } from '../models/shoppingList';

type ShoppingListSectionProps = {
  shoppingListDoc: ShoppingListDoc;
};

export async function ShoppingListSection({ shoppingListDoc }: ComponentProps<ShoppingListSectionProps>) {
  return (
    <CardSection entity={shoppingListDoc} basePath="shopping-lists">
      <>
        {shoppingListDoc.products.length > 0 ? (
          <ul>
            {shoppingListDoc.products
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(({ name, quantity, unit }) => (
                <li>
                  <label>
                    <input type="checkbox" name={name} />
                    {name} - {getRoundedQuantity(quantity)} {unit}
                  </label>
                </li>
              ))}
          </ul>
        ) : (
          <span>{$t('products.noProducts')}</span>
        )}
      </>
    </CardSection>
  );
}
