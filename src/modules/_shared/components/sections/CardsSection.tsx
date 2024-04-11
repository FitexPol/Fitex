import type { BasePath, Entity, Query } from '../../types';
import { $t } from '../../utils/$t';
import { $tm } from '../../utils/$tm';
import { getPath } from '../../utils/getPath';
import { itemsPerPageOptions, type listPageQuery, sortOptions } from '../../vars';
import { Button } from '../Button';
import { Card } from '../Card';
import { FloatingLink } from '../FloatingLink';
import { Icon } from '../Icon';
import { Checkbox } from '../inputs/Checkbox';
import { Link } from '../Link';

type CardsSectionProps = {
  title: string;
  basePath: BasePath;
  query: Query<typeof listPageQuery>;
  activeFilters: {
    itemsPerPage: number;
    page: number;
  };
  activeSortLabel: string;
  totalCount: number;
};

export function CardsSection({
  title,
  basePath,
  query,
  activeFilters,
  activeSortLabel,
  totalCount,
  children,
}: Html.PropsWithChildren<CardsSectionProps>) {
  return (
    <section>
      <div class="mb-6 flex items-center justify-between gap-y-5">
        <h1 class="mb-0 text-xl" safe>
          {title}
        </h1>
        <Button class="pico-reset" onclick="toggleSidePanel()">
          <Icon type="filter" />
        </Button>

        <div id="side-panel" class="fixed inset-0 z-10 hidden bg-black/50">
          <div
            class="absolute right-0 top-0 h-full bg-pico-card-background p-5"
            onclick="event.stopPropagation()"
          >
            <Button class="pico-reset" onclick="toggleSidePanel()">
              <Icon type="x" />
            </Button>

            <div class="max-h-[calc(100%-2rem)] overflow-y-auto">
              <FilterSection title={$t('_itemsPerPage')}>
                <ul>
                  {itemsPerPageOptions.map(({ label, query: param }) => (
                    <li class="text-sm">
                      <Link href={getPath(`/${basePath}`, { itemsPerPage: param, sort: query.sort })}>
                        <Checkbox
                          name={label}
                          isChecked={param === activeFilters.itemsPerPage.toString()}
                          onchange="event.preventDefault()"
                          class="text-pico-text"
                        >
                          {label}
                        </Checkbox>
                      </Link>
                    </li>
                  ))}
                </ul>
              </FilterSection>

              <FilterSection title={$t('_sort')}>
                <ul>
                  {sortOptions.map(({ label, query: param }) => (
                    <li class="text-sm">
                      <Link
                        href={getPath(`/${basePath}`, { itemsPerPage: query.itemsPerPage, sort: param })}
                        class="capitalize"
                      >
                        <Checkbox
                          name={label}
                          isChecked={label === activeSortLabel}
                          onchange="event.preventDefault()"
                          class="text-pico-text"
                        >
                          {Html.escapeHtml(label)}
                        </Checkbox>
                      </Link>
                    </li>
                  ))}
                </ul>
              </FilterSection>
            </div>
          </div>
        </div>
      </div>

      {totalCount > 0 ? (
        <ul class="grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 2xl:!grid-cols-4">{children}</ul>
      ) : (
        <span safe>{$t('_noResults')}</span>
      )}

      <Pagination
        itemsPerPage={activeFilters.itemsPerPage}
        page={activeFilters.page}
        totalCount={totalCount}
        path={`/${basePath}`}
        currentQuery={query}
      />

      <FloatingLink
        href={`/${basePath}/new`}
        icon={{ type: 'plus', class: 'stroke-white' }}
        text={basePath === 'meals' ? $t('meals.createMeal') : $t('shoppingLists.createShoppingList')}
        class="left-auto right-5 bg-pico-primary"
      />
    </section>
  );
}

type FilterSectionProps = {
  title: string;
};

function FilterSection({ title, children }: Html.PropsWithChildren<FilterSectionProps>) {
  return (
    <div class="mt-5">
      <span class="mb-2 inline-block text-white" safe>
        {title}:
      </span>
      {children}
    </div>
  );
}

type PaginationProps = {
  itemsPerPage: number;
  page: number;
  totalCount: number;
  path: string;
  currentQuery: Query<typeof listPageQuery>;
};

function Pagination({ itemsPerPage, page, totalCount, path, currentQuery }: PaginationProps) {
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return totalPages > 1 ? (
    <ul class="mx-auto my-7 flex w-fit gap-1">
      {totalPages <= 5
        ? getAllItems(totalPages).map((i) => PaginationItem(path, currentQuery, i, page))
        : getFilteredItems(totalPages, page).map((i) =>
            i > 0 ? PaginationItem(path, currentQuery, i, page) : <li class="mx-2">...</li>,
          )}
    </ul>
  ) : (
    <></>
  );
}

function PaginationItem(path: string, currentQuery: Query<typeof listPageQuery>, i: number, page: number) {
  return (
    <li class="mx-1">
      <Link
        href={getPath(path, { ...currentQuery, page: i.toString() })}
        class={$tm('p-1', page === i && 'pointer-events-none font-bold underline underline-offset-4')}
      >
        {i}
      </Link>
    </li>
  );
}

function getAllItems(totalPages: number): number[] {
  return Array.from({ length: totalPages }, (_, i) => i + 1);
}

function getFilteredItems(totalPages: number, page: number): number[] {
  if (page === 1) return [1, 2, -1, totalPages];
  if (page === 2) return [1, 2, 3, -1, totalPages];
  if (page === 3) return [1, 2, 3, 4, -1, totalPages];
  if (page === totalPages) return [1, -1, totalPages - 1, totalPages];
  if (page === totalPages - 1) return [1, -1, totalPages - 2, totalPages - 1, totalPages];
  if (page === totalPages - 2) return [1, -1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];

  return [1, -1, page - 1, page, page + 1, -1, totalPages];
}

type ItemProps<T extends Entity> = {
  entity: T;
  basePath: BasePath;
};

function Item<T extends Entity>({ entity, basePath, children }: Html.PropsWithChildren<ItemProps<T>>) {
  return (
    <li>
      <Card class="h-full">
        <Button
          class="pico-reset flex w-full items-center justify-between !text-left !text-lg sm:pointer-events-none"
          hx-patch={`/api/${basePath}/${entity.id}/visibility-state`}
          hx-target="closest li"
          hx-swap="outerHTML"
          hx-indicator="#loader"
        >
          {entity.name}
          <Icon type="chevron-down" class={$tm('sm:hidden', entity.isVisible && 'rotate-180')} />
        </Button>

        <div
          class={$tm(
            'mt-4 flex h-full flex-col border-t-2 border-t-pico-muted pt-3 sm:flex',
            !entity.isVisible && 'hidden',
          )}
        >
          {children}

          <Link href={`/${basePath}/${entity.id}`} class="mt-auto self-end">
            <Icon type="edit" class="size-6" />
          </Link>
        </div>
      </Card>
    </li>
  );
}

CardsSection.Item = Item;
