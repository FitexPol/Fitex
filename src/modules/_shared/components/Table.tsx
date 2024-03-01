import { type ComponentProps } from '../types';
import { $tm } from '../utils/$tm';

export function Table({ children, class: className }: ComponentProps) {
  return (
    <div class={$tm('w-full overflow-x-auto', className)}>
      <table>{children}</table>
    </div>
  );
}

function Header({ children }: ComponentProps) {
  return (
    <thead>
      <tr>{children}</tr>
    </thead>
  );
}

function HeaderItem({ children }: ComponentProps) {
  return <th scope="col">{children}</th>;
}

function Body({ children }: ComponentProps) {
  return <tbody>{children}</tbody>;
}

function BodyRow({ firstItem, children }: ComponentProps<{ firstItem: string }>) {
  return (
    <tr>
      <th scope="row">{firstItem}</th>
      {children}
    </tr>
  );
}

function BodyCell({ children }: ComponentProps) {
  return <td>{children}</td>;
}

Header.Item = HeaderItem;
Table.Header = Header;

BodyRow.Cell = BodyCell;
Body.Row = BodyRow;
Table.Body = Body;
