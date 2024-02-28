import { type ComponentProps } from '../types';
import { $tm } from '../utils/$tm';

type DropdownProps = {
  label: string;
  icon?: JSX.Element;
};

export function Dropdown({
  children,
  label,
  icon,
  class: className,
}: ComponentProps<DropdownProps>): JSX.Element {
  return (
    <details class={$tm('dropdown mb-0', className)}>
      <summary class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          {!!icon && icon}
          {label}
        </div>
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
