import { Breadcrumbs, type BreadcrumbsItem } from '@components/Breadcrumbs';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';

export type ShoppingListBreadcrumbsProps = {
  items?: BreadcrumbsItem[];
};

export function ShoppingListBreadcrumbs({ items = [] }: ComponentProps<ShoppingListBreadcrumbsProps>) {
  return <Breadcrumbs items={[{ href: '/shopping-lists', label: $t('shoppingLists') }, ...items]} />;
}
