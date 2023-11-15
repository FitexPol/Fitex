type Class = {
  class?: string;
};

type Children = {
  children?: JSX.Element;
};

export type ComponentProps<Props = object> = Props & Class & Children;

type Validator<T = unknown> = {
  value: T;
  message: string;
};

export type TextValidators = {
  minLength?: Validator<number>;
  maxLength?: Validator<number>;
};

export type NumberValidators = {
  min?: Validator<number>;
  max?: Validator<number>;
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

export type FormControl = (TextControl | NumberControl | EmailControl | PasswordControl) & {
  name: string;
  value?: string;
  placeholder?: string;
};

export type Form = Record<string, FormControl>;
export type FormErrors<T extends Form> = Partial<Record<keyof T, string>>;
