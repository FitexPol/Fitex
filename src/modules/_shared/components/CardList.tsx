import { type ComponentProps } from '../types';

type CardListProps = {
  count: number;
  noResultsMessage: string;
};

function CardList({ count, noResultsMessage, children }: ComponentProps<CardListProps>) {
  return count > 0 ? (
    <ul class="grid grid-cols-4 gap-2 xl:grid-cols-5">{children}</ul>
  ) : (
    <span>{noResultsMessage}</span>
  );
}

function CardListItem({ children }: ComponentProps) {
  return <li>{children}</li>;
}

CardList.Item = CardListItem;

export { CardList };
