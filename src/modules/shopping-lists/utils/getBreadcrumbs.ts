import { type BreadcrumbsItem } from '@components/Breadcrumbs';
import { $t } from '@utils/$t';
import { getBreadcrumbs as _getBreadcrumbs } from '@utils/getBreadcrumbs';

export function getBreadcrumbs(items: BreadcrumbsItem[] = []): BreadcrumbsItem[] {
  return _getBreadcrumbs(items, { href: '/shopping-lists', label: $t('shoppingLists') });
}
