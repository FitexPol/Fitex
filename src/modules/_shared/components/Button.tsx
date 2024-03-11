import type { ComponentProps } from '@types';

type ButtonProps = HtmxAttributes & {
  type?: 'button' | 'submit';
  onclick?: string;
  form?: string;
};

export function Button({
  type = 'button',
  onclick,
  children,
  class: className,
  form,
  ...props
}: ComponentProps<ButtonProps>) {
  return (
    <button type={type} form={form} class={className} onclick={onclick} {...props}>
      {children}
    </button>
  );
}
