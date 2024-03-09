import type { ComponentProps } from '@types';

type ButtonProps = HtmxAttributes & {
  type?: 'button' | 'submit';
  onclick?: string;
};

export function Button({
  type = 'button',
  onclick,
  children,
  class: className,
  ...props
}: ComponentProps<ButtonProps>) {
  return (
    <button type={type} class={className} onclick={onclick} {...props}>
      {children}
    </button>
  );
}
