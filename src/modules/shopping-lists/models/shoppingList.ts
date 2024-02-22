import { Schema, type Types, model } from 'mongoose';

import { type Meal, mealSchema } from '@meals/models/meal';
import { type Ingredient, ingredientSchema } from '@models/ingredient';

export type ShoppingListMeal = {
  meal: Meal;
  quantity: number;
};

export type ShoppingList = {
  id: string;
  author: Types.ObjectId;
  name: string;
  isFavorite: boolean;
  creationDate: Date;
  meals: ShoppingListMeal[];
  ingredients: Ingredient[];
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
  meals: [
    {
      meal: mealSchema,
      quantity: {
        type: Number,
        required: true,
        min: 1,
        max: 100,
      },
    },
  ],
  ingredients: [ingredientSchema],
});

export const ShoppingList = model('ShoppingList', shoppingListSchema);
