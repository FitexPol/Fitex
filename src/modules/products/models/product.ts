import { Schema } from 'mongoose';

export enum Unit {
  Unit = '',
  G = 'g',
  Kg = 'kg',
  Ml = 'ml',
  L = 'l',
}

export type Product = {
  name: string;
  quantity: number;
  unit: Unit;
};

export const productSchema = new Schema<Product>({
  name: {
    type: String,
    required: true,
    maxLength: 50,
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
});
