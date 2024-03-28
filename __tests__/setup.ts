// eslint-disable-next-line import/no-unresolved
import { afterAll, beforeAll } from 'bun:test';
import mongoose from 'mongoose';

import { User } from '@auth/models/user';
import { Meal } from '@meals/models/meal';
import { ShoppingList } from '@shopping-lists/models/shoppingList';
import { mongoUri } from '@vars';

let mongo: typeof mongoose;

beforeAll(async () => {
  try {
    mongo = await mongoose.connect(mongoUri);
  } catch (e) {
    console.log(e);
    return;
  }

  const username = 'Test';
  const password = 'TestPassword';

  const hash = await Bun.password.hash(password);

  const user = new User({
    username,
    password: hash,
  });

  await user.save();
});

afterAll(async () => {
  await ShoppingList.collection.drop();
  await Meal.collection.drop();
  await User.collection.drop();
  mongo.disconnect();
});
