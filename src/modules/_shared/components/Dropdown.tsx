import { type ComponentProps } from '../types';
import { $tm } from '../utils/$tm';

type DropdownProps = {
  label: string;
  icon?: JSX.Element;
};

export function Dropdown({ children, label, icon }: ComponentProps<DropdownProps>): JSX.Element {
  return (
    <details class="dropdown mb-0">
      <summary class="flex items-center gap-2">
        {!!icon && icon}
        {label}
      </summary>

      <ul>{children}</ul>
    </details>
  );
}

type ItemProps = {
  active?: boolean;
};

function Item({ active, children }: ComponentProps<ItemProps>): JSX.Element {
  return <li class={$tm(active && 'pointer-events-none bg-pico-muted')}>{children}</li>;
}

Dropdown.Item = Item;
