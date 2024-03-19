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
  function getInputAttributes({ name, id }: ProductDoc) {
    return {
      type: 'checkbox',
      name,
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
                  <label>
                    <input {...getInputAttributes(product)} />
                    {getProduct(product)}
                  </label>
                </li>
              ))}

            {shoppingListDoc.products
              .filter((product) => product.isChecked)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((product) => (
                <li>
                  <label>
                    <input {...getInputAttributes(product)} checked />
                    <s>{getProduct(product)}</s>
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
