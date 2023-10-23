import type { ComponentProps } from '../types';

type ButtonProps = {
  type?: 'button' | 'submit';
};

export default function Button({ type = 'button', children, class: className }: ComponentProps<ButtonProps>) {
  return (
    <button type={type} class={className}>
      {children}
    </button>
  );
}
