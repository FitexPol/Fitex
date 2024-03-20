import { Checkbox } from '@components/inputs/Checkbox';
import { CardSection } from '@components/sections/CardSection';
import { type ProductDoc } from '@models/product';
import type { ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { getRoundedQuantity } from '@utils/getRoundedQuantity';

import { type ShoppingListDoc } from '../models/shoppingList';

type ShoppingListSectionProps = {
  shoppingListDoc: ShoppingListDoc;
};

export async function ShoppingListSection({ shoppingListDoc }: ComponentProps<ShoppingListSectionProps>) {
  function getHxAttributes({ id }: ProductDoc): HtmxAttributes {
    return {
      'hx-patch': `/api/shopping-lists/${shoppingListDoc.id}/products/${id}/check-state`,
      'hx-target': 'closest section',
      'hx-swap': 'outerHTML',
      'hx-trigger': '',
    };
  }

  function getProduct({ name, quantity, unit }: ProductDoc) {
    return (
      <>
        {name} - {getRoundedQuantity(quantity)} {unit}
      </>
    );
  }

  return (
    <CardSection entity={shoppingListDoc} basePath="shopping-lists">
      <>
        {shoppingListDoc.products.length > 0 ? (
          <ul>
            {shoppingListDoc.products
              .filter((product) => !product.isChecked)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((product) => (
                <li>
                  <Checkbox name={product.name} {...getHxAttributes}>
                    {getProduct(product)}
                  </Checkbox>
                </li>
              ))}

            {shoppingListDoc.products
              .filter((product) => product.isChecked)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((product) => (
                <li>
                  <Checkbox name={product.name} isChecked {...getHxAttributes}>
                    <s>{getProduct(product)}</s>
                  </Checkbox>
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
