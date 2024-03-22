import { type JWTUser } from '@auth/models/user';
import { Meal } from '@meals/models/meal';
import { ShoppingList } from '@shopping-lists/models/shoppingList';

export async function getUserProductNames(user: JWTUser): Promise<string[]> {
  const productNames: Record<string, string> = {};

  const shoppingListDocs = await ShoppingList.find({ author: user.id });
  const mealDocs = await Meal.find({ author: user.id });

  shoppingListDocs.forEach(({ products }) => {
    products.forEach(({ name }) => {
      productNames[name] = name;
    });
  });

  mealDocs.forEach(({ products }) => {
    products.forEach(({ name }) => {
      productNames[name] = name;
    });
  });

  return Object.values(productNames);
}
