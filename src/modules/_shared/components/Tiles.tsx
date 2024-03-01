import { type ComponentProps } from '../types';

type TilesProps = {
  count: number;
  noResultsMessage: string;
};

export function Tiles({ count, noResultsMessage, children }: ComponentProps<TilesProps>) {
  return count > 0 ? (
    <ul class="grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 xl:!grid-cols-4 2xl:!grid-cols-5">
      {children}
    </ul>
  ) : (
    <span>{noResultsMessage}</span>
  );
}

function Item({ children }: ComponentProps) {
  return <li>{children}</li>;
}

Tiles.Item = Item;
