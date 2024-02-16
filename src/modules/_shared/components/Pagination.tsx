import { type ComponentProps } from '../types';
import { $tm } from '../utils/$tm';
import { getPath } from '../utils/getPath';

type PaginationProps = {
  itemsPerPage: number;
  page: number;
  totalCount: number;
  path: string;
  currentQuery: Record<string, string>;
};

export function Pagination({
  itemsPerPage,
  page,
  totalCount,
  path,
  currentQuery,
}: ComponentProps<PaginationProps>) {
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <>
      {totalPages > 1 ? (
        <ul class="mx-auto my-7 flex w-fit gap-1" hx-boost="true">
          {totalPages <= 5
            ? getAllItems(totalPages).map((i) => renderItem(path, currentQuery, i, page))
            : getFilteredItems(totalPages, page).map((i) =>
                i > 0 ? renderItem(path, currentQuery, i, page) : <li class="mx-2">...</li>,
              )}
        </ul>
      ) : (
        <></>
      )}
    </>
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

function renderItem(path: string, currentQuery: Record<string, string>, i: number, page: number) {
  return (
    <li class="mx-1">
      <a
        href={getPath(path, { ...currentQuery, page: i.toString() })}
        class={$tm('p-1', page === i && 'pointer-events-none font-bold underline underline-offset-4')}
      >
        {i}
      </a>
    </li>
  );
}
