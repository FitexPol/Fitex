import { type HydratedDocument, Schema, type Types, model } from 'mongoose';

import { type ProductDoc, productSchema } from '@models/product';

type Meal = {
  author: Types.ObjectId;
  name: string;
  description: string;
  creationDate: Date;
  products: ProductDoc[];
  isVisible: boolean;
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
    maxlength: 100,
  },
  description: {
    type: String,
    maxlength: 10000,
  },
  creationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  products: {
    type: [productSchema],
    default: [],
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
});

export const Meal = model('Meal', mealSchema);
export type MealDoc = HydratedDocument<Meal>;
