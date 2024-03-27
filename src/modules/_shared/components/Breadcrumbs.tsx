import { icons } from 'feather-icons';

import { Link } from './Link';
import { type ComponentProps } from '../types';

export type BreadcrumbsItem = {
  href: string;
  label: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbsItem[];
};

export function Breadcrumbs({ items }: ComponentProps<BreadcrumbsProps>) {
  return (
    <ul class="mb-6 flex items-center gap-2 overflow-x-auto">
      <Item href="/">{icons.home.toSvg({ class: 'size-4' })}</Item>

      {items
        .reduce((acc, { href, label }) => {
          if (!acc.length) return [{ href, label }];

          const lastItem = acc[acc.length - 1];

          return [...acc, { href: `${lastItem.href}${href}`, label }];
        }, [] as BreadcrumbsItem[])
        .map(({ href, label }) => (
          <Item href={href}>{label}</Item>
        ))}
    </ul>
  );
}

type ItemProps = {
  href: string;
};

function Item({ href, children }: ComponentProps<ItemProps>) {
  return (
    <li class="mb-0 flex items-center gap-2 before:content-['/'] first-of-type:before:hidden last-of-type:pointer-events-none">
      <Link href={href} class="text-nowrap">
        {children}
      </Link>
    </li>
  );
}
