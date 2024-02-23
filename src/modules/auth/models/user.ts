import { type HydratedDocument, Schema, model } from 'mongoose';

type User = {
  username: string;
  password: string;
};

const userSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = model('User', userSchema);
export type UserDoc = HydratedDocument<User>;
