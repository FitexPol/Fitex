import type { ComponentProps } from '@types';

type ButtonProps = {
  type?: 'button' | 'submit';
};

export default function Button({ type = 'button', children, class: className }: ComponentProps<ButtonProps>) {
  return type === 'submit' ? (
    <input type={type} value={children} class={className} />
  ) : (
    <button type={type} class={className}>
      {children}
    </button>
  );
}
