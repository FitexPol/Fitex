import { type HydratedDocument, Schema, type Types, model } from 'mongoose';

import { type MealDoc } from '@meals/models/meal';
import { type ProductDoc } from '@products/models/product';
import { type Populated } from '@types';
import { Unit } from '@vars';

type ShoppingList = {
  _id: string;
  author: Types.ObjectId;
  name: string;
  isFavorite: boolean;
  creationDate: Date;
  meals: {
    meal: Populated<MealDoc>;
    quantity: number;
  }[];
  products: {
    product: Populated<ProductDoc>;
    quantity: number;
    unit: Unit;
  }[];
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
  isFavorite: {
    type: Boolean,
    required: true,
    default: false,
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
          max: 100,
        },
      },
    ],
    default: [],
  },
  products: {
    type: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          max: 100,
        },
        unit: {
          type: String,
          enum: Object.values(Unit),
        },
      },
    ],
    default: [],
  },
});

export const ShoppingList = model('ShoppingList', shoppingListSchema);
export type ShoppingListDoc = HydratedDocument<ShoppingList>;
