import type { ComponentProps } from '@types';

import { $tm } from '../utils/$tm';

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
  return type === 'submit' ? (
    <input type={type} value={children as string} class={className} {...props} />
  ) : (
    <button type={type} class={$tm('px-4', className)} onclick={onclick} {...props}>
      {children}
    </button>
  );
}
