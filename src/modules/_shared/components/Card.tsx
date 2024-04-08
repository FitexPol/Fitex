import { type PropsWithClass } from '../types';
import { $tm } from '../utils/$tm';

export function Card({ class: className, children }: Html.PropsWithChildren<PropsWithClass>) {
  return <article class={$tm('my-0 flex flex-col', className)}>{children}</article>;
}

type HeaderProps = {
  title: JSX.Element;
};

function Header({ title, class: className, children }: Html.PropsWithChildren<PropsWithClass<HeaderProps>>) {
  return (
    <header class={className}>
      {title}
      {children}
    </header>
  );
}

function Footer({ class: className, children }: Html.PropsWithChildren<PropsWithClass>) {
  return <footer class={className}>{children}</footer>;
}

Card.Header = Header;
Card.Footer = Footer;
