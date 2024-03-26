import type { Document, HydratedDocument, PopulatedDoc, Types } from 'mongoose';

import { type ProductDoc } from './models/product';

type Class = {
  class?: string;
};

type Children = {
  children?: JSX.Element;
};

export type ComponentProps<Props = object> = Props & Class & Children;
export type Populated<T> = PopulatedDoc<Document<Types.ObjectId> & T>;
export type Entity = HydratedDocument<{ name: string; products: ProductDoc[]; isVisible: boolean }>;

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

type Validator = {
  message: string;
  required?: boolean;
};

export type TextValidators = Validator & {
  minLength?: number;
  maxLength?: number;
  regex?: RegExp;
};

export type NumberValidators = Validator & {
  min?: number;
  max?: number;
};

export type TextControl = {
  type: 'text';
  validators?: TextValidators;
};

export type NumberControl = {
  type: 'number';
  validators?: NumberValidators;
};

export type EmailControl = Omit<TextControl, 'type'> & {
  type: 'email';
};

export type PasswordControl = Omit<TextControl, 'type'> & {
  type: 'password';
};

export type SearchControl = Omit<TextControl, 'type'> & {
  type: 'search';
};

export type FormControl = (TextControl | NumberControl | EmailControl | PasswordControl | SearchControl) & {
  name: string;
};

export type Form = Record<string, FormControl | FormControl[]>;
export type FormErrors<T extends Form> = Partial<Record<keyof T, string>>;
