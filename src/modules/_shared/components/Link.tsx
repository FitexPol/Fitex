import { type ComponentProps } from '../types';

type LinkProps = {
  href: string;
};

export function Link({ href, class: className, children }: ComponentProps<LinkProps>) {
  return (
    <a href={href} class={className} hx-indicator="#loader" hx-boost="true">
      {children}
    </a>
  );
}
