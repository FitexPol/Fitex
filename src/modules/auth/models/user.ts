import { type HydratedDocument, Schema, model } from 'mongoose';

export type JWTUser = {
  id: string;
  username: string;
  roles: Role[];
  hasRole: (...roles: Role[]) => boolean;
};

export enum Role {
  User = 'USER',
  Admin = 'ADMIN',
}

type User = {
  username: string;
  password: string;
  roles: Role[];
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
  roles: {
    type: [String],
    enum: Object.values(Role),
    default: [Role.User],
  },
});

export const User = model('User', userSchema);
export type UserDoc = HydratedDocument<User>;
