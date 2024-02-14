import { Schema, type Types, model } from 'mongoose';

export type User = {
  id: Types.ObjectId;
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
