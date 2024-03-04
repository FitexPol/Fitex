import { type HydratedDocument, Schema, model } from 'mongoose';

import { type Lang } from '@utils/$t';

export enum Category {
  Vegetables = 'vegetables',
  Fruits = 'fruits',
  Dairy = 'dairy',
  Meat = 'meat',
  Fish = 'fish',
  Bread = 'bread',
  Sweets = 'sweets',
  Drinks = 'drinks',
  Other = '',
}

export type Product = {
  name: Record<Lang, string>;
  category: Category;
};

export const productSchema = new Schema<Product>({
  name: {
    ['pl-PL']: {
      type: String,
      minLength: 3,
      maxlength: 50,
    },
    ['en-US']: {
      type: String,
      maxlength: 50,
      default: '',
    },
  },
  category: {
    type: String,
    enum: Object.values(Category),
    default: Category.Other,
  },
});

export const Product = model('Product', productSchema);
export type ProductDoc = HydratedDocument<Product>;
