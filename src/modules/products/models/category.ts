import { type HydratedDocument, Schema, model } from 'mongoose';

import { type Lang } from '@utils/$t';

export type Category = {
  name: Record<Lang, string>;
};

export const categorySchema = new Schema<Category>({
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
});

export const Category = model('Category', categorySchema);
export type CategoryDoc = HydratedDocument<Category>;
