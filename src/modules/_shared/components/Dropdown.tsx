import { type ComponentProps } from '../types';
import { $tm } from '../utils/$tm';

type DropdownProps = {
  label: string;
  icon?: JSX.Element;
};

export function Dropdown({ children, label, icon }: ComponentProps<DropdownProps>): JSX.Element {
  return (
    <details role="list" class="mb-0">
      <summary aria-haspopup="listbox" class="flex items-center gap-2 border-none">
        {!!icon && icon}
        {label}
      </summary>

      <ul role="listbox" class="!left-auto w-fit">
        {children}
      </ul>
    </details>
  );
}

type ItemProps = {
  active?: boolean;
};

function Item({ active, children }: ComponentProps<ItemProps>): JSX.Element {
  return (
    <li
      class={$tm('text-white', active && 'pointer-events-none bg-[var(--dropdown-hover-background-color)]')}
    >
      {children}
    </li>
  );
}

Dropdown.Item = Item;
