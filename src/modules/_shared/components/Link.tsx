import { type ComponentProps } from '../types';

type LinkProps = {
  href: string;
  role?: HTMLAnchorElement['role'];
};

export function Link({ href, role, class: className, children }: ComponentProps<LinkProps>) {
  return (
    <a href={href} role={role ? role : undefined} class={className} hx-indicator="#loader" hx-boost="true">
      {children}
    </a>
  );
}
