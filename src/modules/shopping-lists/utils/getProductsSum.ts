import { type ProductDoc } from '@models/product';
import { getGroupedProducts } from '@utils/getGroupedProducts';
import { getPopulatedDoc } from '@utils/getPopulatedDoc';

import { type ShoppingListDoc } from '../models/shoppingList';

export function getProductsSum(shoppingListDoc: ShoppingListDoc): ProductDoc[] {
  const { meals, products } = shoppingListDoc;
  const allProducts: ProductDoc[] = [];

  if (meals.length > 0) {
    meals.forEach(({ meal, quantity: mealQuantity }) => {
      const mealDoc = getPopulatedDoc(meal);

      if (!mealDoc) return;

      mealDoc.products.forEach((productDoc) => {
        productDoc.quantity = productDoc.quantity * mealQuantity;
        allProducts.push(productDoc);
      });
    });
  }

  if (products.length > 0) {
    allProducts.push(...products);
  }

  return getGroupedProducts(allProducts);
}
