import type { Document, PopulatedDoc, Types } from 'mongoose';

type Class = {
  class?: string;
};

type Children = {
  children?: JSX.Element;
};

export type ComponentProps<Props = object> = Props & Class & Children;

export type Populated<T> = PopulatedDoc<Document<Types.ObjectId> & T>;

export type SortOption<T> = {
  label: string;
  value: T;
};

export type Datalist = {
  id: string;
  options: string[];
};

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
  placeholder?: string;
};

export type Form = Record<string, FormControl | FormControl[]>;
export type FormErrors<T extends Form> = Partial<Record<keyof T, string>>;
