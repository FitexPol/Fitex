import { Checkbox } from '@components/inputs/Checkbox';
import { type ProductDoc } from '@models/product';
import { $t } from '@utils/$t';
import { getRoundedQuantity } from '@utils/getRoundedQuantity';

import { type ShoppingListDoc } from '../models/shoppingList';

type ShoppingListCardProductsProps = {
  shoppingListDoc: ShoppingListDoc;
};

export function ShoppingListCardProducts({ shoppingListDoc }: ShoppingListCardProductsProps) {
  function getHxAttributes({ id }: ProductDoc): Htmx.Attributes {
    return {
      'hx-patch': `/api/shopping-lists/${shoppingListDoc.id}/products/${id}/check-state`,
      'hx-target': 'closest ul',
      'hx-swap': 'outerHTML',
      'hx-indicator': '#loader',
    };
  }

  function getProduct({ name, quantity, unit }: ProductDoc) {
    return (
      <>
        {name} - {getRoundedQuantity(quantity)} {unit}
      </>
    );
  }

  return shoppingListDoc.products.length > 0 ? (
    <ul>
      {shoppingListDoc.products
        .filter((product) => !product.isChecked)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((product) => (
          <li>
            <Checkbox name={product.id} {...getHxAttributes(product)}>
              {getProduct(product)}
            </Checkbox>
          </li>
        ))}

      {shoppingListDoc.products
        .filter((product) => product.isChecked)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((product) => (
          <li>
            <Checkbox name={product.name} {...getHxAttributes(product)} isChecked>
              <s>{getProduct(product)}</s>
            </Checkbox>
          </li>
        ))}
    </ul>
  ) : (
    <span>{$t('products.noProducts')}</span>
  );
}
