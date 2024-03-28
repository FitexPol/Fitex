// eslint-disable-next-line import/no-unresolved
import { afterAll, beforeAll, describe, expect, it } from 'bun:test';

import { type JWTUser } from '@auth/models/user';
import { Meal } from '@meals/models/meal';
import { Product } from '@models/product';
import { ShoppingList } from '@shopping-lists/models/shoppingList';
import { getMostUsedProductNames } from '@utils/getMostUsedProductNames';

import { getUser } from '../../../utils';

describe('getMostUsedProductNames', () => {
  let user: JWTUser;

  beforeAll(async () => {
    user = await getUser();

    const shoppingListDoc = new ShoppingList({
      name: 'Test',
      author: user.id,
      products: [new Product({ name: 'Test product 1' }), new Product({ name: 'Test product 2' })],
    });

    await shoppingListDoc.save();

    const mealDoc = new Meal({
      name: 'Test',
      author: user.id,
      products: [new Product({ name: 'Test product 2' }), new Product({ name: 'Test product 3' })],
    });

    await mealDoc.save();
  });

  it('should return product names array sorted by number of occurrences', async () => {
    const productNames = await getMostUsedProductNames(user);

    expect(productNames).toEqual(['Test product 2', 'Test product 1', 'Test product 3']);
  });

  afterAll(async () => {
    await ShoppingList.collection.drop();
    await Meal.collection.drop();
  });
});
