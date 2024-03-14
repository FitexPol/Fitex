import { type HydratedDocument, Schema, type Types, model } from 'mongoose';

import { type MealDoc } from '@meals/models/meal';
import { type ProductDoc, productSchema } from '@models/product';
import type { Populated } from '@types';

type ShoppingList = {
  author: Types.ObjectId;
  name: string;
  creationDate: Date;
  meals: {
    meal: Populated<MealDoc>;
    quantity: number;
  }[];
  products: ProductDoc[];
};

const shoppingListSchema = new Schema<ShoppingList>({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxlength: 50,
  },
  creationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  meals: {
    type: [
      {
        meal: {
          type: Schema.Types.ObjectId,
          ref: 'Meal',
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    default: [],
  },
  products: {
    type: [productSchema],
    default: [],
  },
});

export const ShoppingList = model('ShoppingList', shoppingListSchema);
export type ShoppingListDoc = HydratedDocument<ShoppingList>;
