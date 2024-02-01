import type { ComponentProps } from '@types';

type ButtonProps = {
  type?: 'button' | 'submit';
};

export function Button({ type = 'button', children, class: className }: ComponentProps<ButtonProps>) {
  return type === 'submit' ? (
    <input type={type} value={children as string} class={className} />
  ) : (
    <button type={type} class={className}>
      {children}
    </button>
  );
}
