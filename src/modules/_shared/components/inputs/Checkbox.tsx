import { type ComponentProps } from '../../types';

type CheckboxProps = HtmxAttributes & {
  name: string;
  isChecked?: boolean;
  onchange?: string;
};

export function Checkbox({
  name,
  isChecked,
  onchange,
  children,
  class: className,
  ...hxAttributes
}: ComponentProps<CheckboxProps>) {
  return (
    <label class={className}>
      <input type="checkbox" name={name} checked={isChecked} {...hxAttributes} onchange={onchange} />
      {children}
    </label>
  );
}
