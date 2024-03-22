import { type HydratedDocument, Schema, type Types, model } from 'mongoose';

import { type ProductDoc, productSchema } from '@models/product';

type Meal = {
  author: Types.ObjectId;
  name: string;
  description: string;
  isFavorite: boolean;
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
