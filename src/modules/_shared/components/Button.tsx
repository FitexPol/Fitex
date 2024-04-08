import { type PropsWithClass } from '@types';

type ButtonProps = Htmx.Attributes & {
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
}: Html.PropsWithChildren<PropsWithClass<ButtonProps>>) {
  return (
    <button type={type} form={form} class={className} onclick={onclick} {...props}>
      {children}
    </button>
  );
}
