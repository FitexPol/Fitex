import { type HydratedDocument, Schema, type Types, model } from 'mongoose';

import { type ProductDoc } from '@products/models/product';
import { type Populated } from '@types';
import { Unit } from '@vars';

type Meal = {
  author: Types.ObjectId;
  name: string;
  description: string;
  isFavorite: boolean;
  creationDate: Date;
  products: {
    product: Populated<ProductDoc>;
    quantity: number;
    unit: Unit;
  }[];
};

const mealSchema = new Schema<Meal>({
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
  description: {
    type: String,
    maxlength: 100,
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

export const Meal = model('Meal', mealSchema);
export type MealDoc = HydratedDocument<Meal>;
