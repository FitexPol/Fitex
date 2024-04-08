import { Breadcrumbs, type BreadcrumbsItem } from '@components/Breadcrumbs';
import { $t } from '@utils/$t';

export type ShoppingListBreadcrumbsProps = {
  items?: BreadcrumbsItem[];
};

export function ShoppingListBreadcrumbs({ items = [] }: ShoppingListBreadcrumbsProps) {
  return <Breadcrumbs items={[{ href: '/shopping-lists', label: $t('shoppingLists') }, ...items]} />;
}
