import { type ComponentProps } from '../types';
import { $tm } from '../utils/$tm';

type LinkProps = {
  href: string;
  role?: HTMLAnchorElement['role'];
};

export function Link({ href, role, class: className, children }: ComponentProps<LinkProps>) {
  return (
    <a
      href={href}
      role={role ? role : undefined}
      class={$tm('inline-block', className)}
      hx-indicator="#loader"
      hx-boost="true"
    >
      {children}
    </a>
  );
}
