import { Breadcrumbs, type BreadcrumbsItem } from '@components/Breadcrumbs';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';

export type MealBreadcrumbsProps = {
  items?: BreadcrumbsItem[];
};

export function MealBreadcrumbs({ items = [] }: ComponentProps<MealBreadcrumbsProps>) {
  return <Breadcrumbs items={[{ href: '/meals', label: $t('meals') }, ...items]} />;
}
