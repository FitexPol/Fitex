import { Schema, type Types, model } from 'mongoose';

export type Ingredient = {
  name: string;
  unit: string;
  quantity: number;
};

export type Meal = {
  id: Types.ObjectId;
  name: string;
  description: string;
  author: Types.ObjectId;
  creationDate: Date;
  ingredients: Ingredient[];
};

export const mealSchema = new Schema<Meal>({
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
  creationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  ingredients: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        max: 100,
      },
      unit: {
        type: String,
        required: true,
      },
    },
  ],
});

export const Meal = model('Meal', mealSchema);
