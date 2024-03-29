import { Breadcrumbs, type BreadcrumbsItem } from '@components/Breadcrumbs';
import { $t } from '@utils/$t';

export type MealBreadcrumbsProps = {
  items?: BreadcrumbsItem[];
};

export function MealBreadcrumbs({ items = [] }: MealBreadcrumbsProps) {
  return <Breadcrumbs items={[{ href: '/meals', label: $t('meals') }, ...items]} />;
}
