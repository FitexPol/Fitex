import { type HydratedDocument, Schema, type Types, model } from 'mongoose';

import { type Ingredient, ingredientSchema } from '@models/ingredient';

type Meal = {
  author: Types.ObjectId;
  name: string;
  description: string;
  isFavorite: boolean;
  creationDate: Date;
  ingredients: Ingredient[];
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
  ingredients: {
    type: [ingredientSchema],
    required: true,
    default: [],
  },
});

export const Meal = model('Meal', mealSchema);
export type MealDoc = HydratedDocument<Meal>;
