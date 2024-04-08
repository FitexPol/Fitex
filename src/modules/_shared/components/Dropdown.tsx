import { Icon } from './Icon';
import { type PropsWithClass } from '../types';
import { $tm } from '../utils/$tm';

type DropdownProps = {
  label: string;
  isIconVisible: boolean;
};

export function Dropdown({
  label,
  isIconVisible,
  class: className,
  children,
}: Html.PropsWithChildren<PropsWithClass<DropdownProps>>): JSX.Element {
  return (
    <details class={$tm('dropdown mb-0', className)}>
      <summary class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          {!!isIconVisible && (
            <>
              <Icon type="user" />
            </>
          )}
          {Html.escapeHtml(label)}
        </div>
      </summary>

      <ul>{children}</ul>
    </details>
  );
}

type ItemProps = {
  active?: boolean;
};

function Item({ active, children }: Html.PropsWithChildren<ItemProps>): JSX.Element {
  return <li class={$tm(active && 'pointer-events-none bg-pico-muted')}>{children}</li>;
}

Dropdown.Item = Item;
