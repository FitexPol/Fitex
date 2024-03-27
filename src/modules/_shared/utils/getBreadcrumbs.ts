import { type BreadcrumbsItem } from '@components/Breadcrumbs';

export function getBreadcrumbs(items: BreadcrumbsItem[] = [], firstItem: BreadcrumbsItem): BreadcrumbsItem[] {
  return items.reduce(
    (acc, { href, label }) => {
      const lastItem = acc[acc.length - 1];

      return [...acc, { href: `${lastItem.href}${href}`, label }];
    },
    [firstItem] as BreadcrumbsItem[],
  );
}
