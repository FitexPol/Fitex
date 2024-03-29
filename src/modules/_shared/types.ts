import type { Document, HydratedDocument, PopulatedDoc, Types } from 'mongoose';

import { type ProductDoc } from './models/product';

export type Populated<T> = PopulatedDoc<Document<Types.ObjectId> & T>;
export type Entity = HydratedDocument<{ name: string; products: ProductDoc[]; isVisible: boolean }>;

export type PropsWithClass<T = unknown> = { class?: string } & T;

export type SortOption<T> = {
  label: string;
  value: T;
};

export type Datalist = {
  id: string;
  options: string[];
};

export type Tab = {
  href: string;
  label: string;
  component: JSX.Element;
};

export type BasePath = 'meals' | 'shopping-lists';
export type Query = Record<string, string | undefined>;

export type Validator<T = unknown> = {
  message: string;
  required?: boolean;
} & T;

export type TextValidators = Validator<{
  minLength?: number;
  maxLength?: number;
  regex?: RegExp;
}>;

export type NumberValidators = Validator<{
  min?: number;
  max?: number;
}>;

type Control<
  T extends 'text' | 'number' | 'email' | 'password' | 'search',
  P extends Validator = Validator,
> = {
  name: string;
  type: T;
  validators?: P;
};

export type TextControl = Control<'text', TextValidators>;
export type NumberControl = Control<'number', NumberValidators>;
export type PasswordControl = Control<'password', TextValidators>;
export type SearchControl = Control<'search', TextValidators>;

export type FormControl = TextControl | NumberControl | PasswordControl | SearchControl;
export type Form = Record<string, FormControl>;
export type FormErrors<T extends Form> = Partial<Record<keyof T, string>>;
