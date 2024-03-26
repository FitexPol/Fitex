import { type JWTUser } from '@auth/models/user';
import { Meal } from '@meals/models/meal';
import { ShoppingList } from '@shopping-lists/models/shoppingList';

export async function geMostUsedProductNames(user: JWTUser): Promise<string[]> {
  const productNames: Record<string, { count: number; name: string }> = {};

  const shoppingListDocs = await ShoppingList.find({ author: user.id });
  const mealDocs = await Meal.find({ author: user.id });

  shoppingListDocs.forEach(({ products }) => {
    products.forEach(({ name }) => {
      if (!productNames[name]) {
        productNames[name] = { count: 1, name };
        return;
      }

      productNames[name].count++;
    });
  });

  mealDocs.forEach(({ products }) => {
    products.forEach(({ name }) => {
      if (!productNames[name]) {
        productNames[name] = { count: 1, name };
        return;
      }

      productNames[name].count++;
    });
  });

  return Object.values(productNames)
    .sort((a, b) => b.count - a.count)
    .map(({ name }) => name);
}
