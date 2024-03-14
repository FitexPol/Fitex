import { type Product } from '@models/product';
import { getGroupedProducts } from '@utils/getGroupedProducts';
import { getPopulatedDoc } from '@utils/getPopulatedDoc';

import { type ShoppingListDoc } from '../models/shoppingList';

export function getProductsSum(shoppingListDoc: ShoppingListDoc): Product[] {
  const { meals, products } = shoppingListDoc;
  const allProducts: Product[] = [];

  if (meals.length > 0) {
    meals.forEach(({ meal, quantity: mealQuantity }) => {
      const mealDoc = getPopulatedDoc(meal);

      if (!mealDoc) return;

      mealDoc.products.forEach((product) => {
        allProducts.push({
          name: product.name,
          quantity: product.quantity * mealQuantity,
          unit: product.unit,
        });
      });
    });
  }

  if (products.length > 0) {
    allProducts.push(...products);
  }

  return getGroupedProducts(allProducts);
}
