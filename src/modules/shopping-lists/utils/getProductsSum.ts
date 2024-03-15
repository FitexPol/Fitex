import { type ProductDoc } from '@models/product';
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

function getGroupedProducts(items: ProductDoc[]): typeof items {
  if (items.length === 0) return [];

  const groupedProducts = items.reduce(
    (acc, productDoc) => {
      const nameCopy = productDoc.name;
      nameCopy.toLocaleLowerCase().trim();

      const key = `${nameCopy}.${productDoc.unit}`;

      acc[key] ? (acc[key].quantity += productDoc.quantity) : (acc[key] = productDoc);

      return acc;
    },
    {} as Record<string, ProductDoc>,
  );

  return Object.values(groupedProducts);
}