import { type HydratedDocument, Schema, type Types, model } from 'mongoose';

import { type ProductDoc, productSchema } from '@models/product';

type ShoppingList = {
  author: Types.ObjectId;
  name: string;
  creationDate: Date;
  products: ProductDoc[];
  isVisible: boolean;
};

export const shoppingListSchema = new Schema<ShoppingList>({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxlength: 100,
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
  isVisible: {
    type: Boolean,
    default: true,
  },
});

export const ShoppingList = model('ShoppingList', shoppingListSchema);
export type ShoppingListDoc = HydratedDocument<ShoppingList>;
