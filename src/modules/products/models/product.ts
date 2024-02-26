import { type HydratedDocument, Schema, model } from 'mongoose';

export type Product = {
  name: string;
  category: string;
};

export const productSchema = new Schema<Product>({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

export const Product = model('Product', productSchema);
export type ProductDoc = HydratedDocument<Product>;
