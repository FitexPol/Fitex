import { Schema } from 'mongoose';

export type Ingredient = {
  name: string;
  unit: string;
  quantity: number;
};

export const ingredientSchema = new Schema<Ingredient>({
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
});
