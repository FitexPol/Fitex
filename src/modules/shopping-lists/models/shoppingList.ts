import { type HydratedDocument, Schema, type Types, model } from 'mongoose';

import { type ProductDoc, productSchema } from '@models/product';

type ShoppingList = {
  author: Types.ObjectId;
  name: string;
  creationDate: Date;
  products: ProductDoc[];
  selectedProducts: string[];
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
  creationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  products: {
    type: [productSchema],
    default: [],
  },
  selectedProducts: {
    type: [String],
    default: [],
  },
});

export const ShoppingList = model('ShoppingList', shoppingListSchema);
export type ShoppingListDoc = HydratedDocument<ShoppingList>;
