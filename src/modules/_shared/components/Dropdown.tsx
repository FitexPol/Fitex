import { type ComponentProps } from '../types';

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

      <ul role="listbox" class="left-auto">
        {children}
      </ul>
    </details>
  );
}

function Item({ children }: ComponentProps): JSX.Element {
  return <li class="text-white">{children}</li>;
}

Dropdown.Item = Item;
