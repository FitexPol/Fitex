import { type ComponentProps } from '../types';

type TilesProps = {
  count: number;
  noResultsMessage: string;
};

export function Tiles({ count, noResultsMessage, children }: ComponentProps<TilesProps>) {
  return count > 0 ? (
    <ul class="!xl:grid-cols-5 grid !grid-cols-4 gap-2">{children}</ul>
  ) : (
    <span>{noResultsMessage}</span>
  );
}

function Item({ children }: ComponentProps) {
  return <li>{children}</li>;
}

Tiles.Item = Item;
