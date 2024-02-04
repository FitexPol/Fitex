import { Schema, model } from 'mongoose';

import { emailMatcher } from '@utils/validators';

type User = {
  username: string;
  email: string;
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
  email: {
    type: String,
    required: true,
    unique: true,
    match: emailMatcher,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = model('User', userSchema);
