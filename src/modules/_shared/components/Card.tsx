import { type ComponentProps } from '../types';
import { $tm } from '../utils/$tm';

export function Card({ class: className, children }: ComponentProps) {
  return <article class={$tm('my-0', className)}>{children}</article>;
}

type HeaderProps = {
  title: string;
};

function Header({ title, class: className, children }: ComponentProps<HeaderProps>) {
  return (
    <header class={$tm(className)}>
      <h1>{title}</h1>
      {children}
    </header>
  );
}

function Footer({ class: className, children }: ComponentProps) {
  return <footer class={$tm(className)}>{children}</footer>;
}

Card.Header = Header;
Card.Footer = Footer;
