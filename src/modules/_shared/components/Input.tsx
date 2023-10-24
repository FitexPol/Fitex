import type { ComponentProps } from '../types';

type InputProps = {
  type: 'email' | 'password' | 'submit';
  name?: string;
  value?: string;
};

export default function Input({ ...attr }: Omit<ComponentProps<InputProps>, 'children'>) {
  return <input {...attr} />;
}
