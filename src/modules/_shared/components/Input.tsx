import type { ComponentProps } from '../types';

type InputProps = {
  type: 'email' | 'password';
};

export default function Input({ type, class: className }: ComponentProps<InputProps>) {
  return <input type={type} class={`rounded-lg border-2 border-gray-500 px-3 py-1 ${className}`} />;
}
