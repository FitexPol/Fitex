import { icons } from 'feather-icons';
import { type HydratedDocument } from 'mongoose';

import { CardProducts } from '@products/components/CardProducts';
import { type ProductDoc } from '@products/models/product';

import type { BasePath, ComponentProps } from '../../types';
import { $t } from '../../utils/$t';
import { $tm } from '../../utils/$tm';
import { getPath } from '../../utils/getPath';
import { itemsPerPageOptions, sortOptions } from '../../vars';
import { Button } from '../Button';
import { Card } from '../Card';
import { Dropdown } from '../Dropdown';
import { Link } from '../Link';

const _tShared = $t('_shared');

type CardsSectionProps = {
  title: string;
  basePath: BasePath;
  query: {
    sort: string;
    itemsPerPage: string;
    page: string;
  };
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
}: ComponentProps<CardsSectionProps>) {
  return (
    <section>
      <div class="mb-6 flex flex-col items-start justify-between gap-y-5 md:flex-row lg:items-center">
        <div class="flex items-center gap-2">
          <h1 class="mb-0 text-xl">{title}</h1>
          <Link href={`/${basePath}/basic-information-form`}>{icons['plus-circle'].toSvg()}</Link>
        </div>

        <div class="flex flex-col gap-2 lg:flex-row">
          <Dropdown label={`${_tShared('_shared.itemsPerPage')}: ${activeFilters.itemsPerPage}`}>
            <>
              {itemsPerPageOptions.map(({ label, query: param }) => (
                <Dropdown.Item active={param === activeFilters.itemsPerPage.toString()}>
                  <Link href={getPath(`/${basePath}`, { itemsPerPage: param, sort: query.sort })}>
                    {label}
                  </Link>
                </Dropdown.Item>
              ))}
            </>
          </Dropdown>

          <Dropdown label={`${_tShared('_shared.sort')}: ${activeSortLabel}`}>
            <>
              {sortOptions.map(({ label, query: param }) => (
                <Dropdown.Item active={label === activeSortLabel}>
                  <Link
                    href={getPath(`/${basePath}`, {
                      itemsPerPage: query.itemsPerPage,
                      sort: param,
                    })}
                    class="capitalize"
                  >
                    {label}
                  </Link>
                </Dropdown.Item>
              ))}
            </>
          </Dropdown>
        </div>
      </div>

      {totalCount > 0 ? (
        <ul class="grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 xl:!grid-cols-4 2xl:!grid-cols-5">
          {children}
        </ul>
      ) : (
        <span>{_tShared('_shared.noResults')}</span>
      )}

      <Pagination
        itemsPerPage={activeFilters.itemsPerPage}
        page={activeFilters.page}
        totalCount={totalCount}
        path={`/${basePath}`}
        currentQuery={query}
      />
    </section>
  );
}

type PaginationProps = {
  itemsPerPage: number;
  page: number;
  totalCount: number;
  path: string;
  currentQuery: Record<string, string>;
};

function Pagination({ itemsPerPage, page, totalCount, path, currentQuery }: ComponentProps<PaginationProps>) {
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <>
      {totalPages > 1 ? (
        <ul class="mx-auto my-7 flex w-fit gap-1">
          {totalPages <= 5
            ? getAllItems(totalPages).map((i) => PaginationItem(path, currentQuery, i, page))
            : getFilteredItems(totalPages, page).map((i) =>
                i > 0 ? PaginationItem(path, currentQuery, i, page) : <li class="mx-2">...</li>,
              )}
        </ul>
      ) : (
        <></>
      )}
    </>
  );
}

function PaginationItem(path: string, currentQuery: Record<string, string>, i: number, page: number) {
  return (
    <li class="mx-1">
      <Link
        href={getPath(path, { ...currentQuery, page: i.toString() })}
        class={$tm('p-1', page === i && 'pointer-events-none font-bold underline underline-offset-4')}
      >
        <>{i}</>
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

type Entity = HydratedDocument<{ name: string; products: ProductDoc[] }>;

type ItemProps<T extends Entity> = {
  entity: T;
  basePath: BasePath;
};

function Item<T extends Entity>({ entity, basePath, children }: ComponentProps<ItemProps<T>>) {
  return (
    <li>
      <Card class="group relative h-full">
        <>
          <Card.Header title={<h3 class="mb-0 pr-7 text-lg">{entity.name}</h3>} />

          <Link
            href={getPath(`/${basePath}/${entity.id}`, { groupByMeals: 'on' })}
            class="contrast flex-grow"
          >
            <>
              <CardProducts products={entity.products} />
              {children}
            </>
          </Link>

          <Card.Footer class="flex justify-end gap-2">
            <>
              <Button
                class="pico-reset !text-inherit"
                hx-delete={`/api/${basePath}/${entity.id}`}
                hx-target="closest section"
                hx-swap="outerHTML"
                hx-confirm={_tShared('_shared.deletionConfirmation')}
                hx-indicator="#loader"
              >
                {icons.trash.toSvg()}
              </Button>

              <Link href={`/${basePath}/${entity.id}/edit`}>{icons.edit.toSvg()}</Link>
            </>
          </Card.Footer>
        </>
      </Card>
    </li>
  );
}

CardsSection.Item = Item;
