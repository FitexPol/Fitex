import { type HydratedDocument, Schema, model } from 'mongoose';

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
  isChecked: boolean;
};

export const productSchema = new Schema<Product>({
  name: {
    type: String,
    required: true,
    maxLength: 100,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0.1,
    default: 1,
  },
  unit: {
    type: String,
    enum: Object.values(Unit),
    default: Unit.Unit,
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
});

export const Product = model('Product', productSchema);
export type ProductDoc = HydratedDocument<Product>;
