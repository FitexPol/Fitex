import { type PropsWithClass } from '../types';

type LinkProps = {
  href: string;
};

export function Link({
  href,
  class: className,
  children,
}: Html.PropsWithChildren<PropsWithClass<LinkProps>>) {
  return (
    <a href={href} class={className} hx-indicator="#loader" hx-boost="true">
      {children}
    </a>
  );
}
