import type { ComponentProps } from '../types';

type ButtonProps = {
  type?: 'button' | 'submit';
};

export default function Button({ type = 'button', class: className, children }: ComponentProps<ButtonProps>) {
  return (
    <button
      type={type}
      class={`rounded-lg border-2 border-green-700 bg-green-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-50 hover:text-green-700 ${className}`}
    >
      {children}
    </button>
  );
}
