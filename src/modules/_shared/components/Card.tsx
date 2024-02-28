import { type ComponentProps } from '../types';
import { $tm } from '../utils/$tm';

export function Card({ class: className, children }: ComponentProps) {
  return <article class={$tm('my-0', className)}>{children}</article>;
}

type HeaderProps = {
  title: JSX.Element;
};

function Header({ title, class: className, children }: ComponentProps<HeaderProps>) {
  return (
    <header class={className}>
      {title}
      {children}
    </header>
  );
}

function Footer({ class: className, children }: ComponentProps) {
  return <footer class={className}>{children}</footer>;
}

Card.Header = Header;
Card.Footer = Footer;
