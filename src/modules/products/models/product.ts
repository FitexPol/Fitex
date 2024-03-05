import { type HydratedDocument, Schema, Types, model } from 'mongoose';

import { type Populated } from '@types';
import { type Lang } from '@utils/$t';

import { type CategoryDoc } from './category';

export type Product = {
  name: Record<Lang, string>;
  category: Populated<CategoryDoc>;
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
    type: Types.ObjectId,
    ref: 'Category',
  },
});

export const Product = model('Product', productSchema);
export type ProductDoc = HydratedDocument<Product>;
