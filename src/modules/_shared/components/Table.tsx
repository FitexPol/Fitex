import { type PropsWithClass } from '../types';
import { $tm } from '../utils/$tm';

type TableProps = {
  id?: string;
};

export function Table({
  id,
  children,
  class: className,
}: Html.PropsWithChildren<PropsWithClass<TableProps>>) {
  return (
    <div id={id} class={$tm('w-full overflow-x-auto', className)}>
      <table>{children}</table>
    </div>
  );
}

function Header({ children }: Html.PropsWithChildren) {
  return (
    <thead>
      <tr>{children}</tr>
    </thead>
  );
}

function HeaderItem({ children }: Html.PropsWithChildren) {
  return <th scope="col">{children}</th>;
}

function Body({ children }: Html.PropsWithChildren) {
  return <tbody>{children}</tbody>;
}

function BodyRow({ firstItem, children }: Html.PropsWithChildren<{ firstItem: JSX.Element }>) {
  return (
    <tr>
      <th scope="row">{firstItem}</th>
      {children}
    </tr>
  );
}

function BodyCell({ children }: Html.PropsWithChildren) {
  return <td>{children}</td>;
}

Header.Item = HeaderItem;
Table.Header = Header;

BodyRow.Cell = BodyCell;
Body.Row = BodyRow;
Table.Body = Body;
