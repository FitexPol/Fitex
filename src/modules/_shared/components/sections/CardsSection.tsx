import { icons } from 'feather-icons';

import { type ComponentProps } from '../../types';
import { $t } from '../../utils/$t';
import { getPath } from '../../utils/getPath';
import { itemsPerPageOptions, sortOptions } from '../../vars';
import { Dropdown } from '../Dropdown';
import { Link } from '../Link';
import { Pagination } from '../Pagination';

const _tShared = $t('_shared');

type CardsSectionProps = {
  title: string;
  basePath: 'meals' | 'shopping-lists';
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

      {children}

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

function Cards({ children }: ComponentProps) {
  return (
    <ul class="grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 xl:!grid-cols-4 2xl:!grid-cols-5">
      {children}
    </ul>
  );
}

function Item({ children }: ComponentProps) {
  return <li>{children}</li>;
}

Cards.Item = Item;
CardsSection.Cards = Cards;
