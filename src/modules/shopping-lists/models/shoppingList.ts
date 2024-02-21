import { Schema, type Types, model } from 'mongoose';

export type ShoppingList = {
  id: string;
  author: Types.ObjectId;
  name: string;
  isFavorite: boolean;
  creationDate: Date;
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
});

export const ShoppingList = model('ShoppingList', shoppingListSchema);
