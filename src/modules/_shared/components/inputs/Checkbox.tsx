import { type ComponentProps } from '../../types';

type CheckboxProps = HtmxAttributes & {
  name: string;
  isChecked?: boolean;
};

export function Checkbox({
  name,
  isChecked,
  children,
  class: className,
  ...hxAttributes
}: ComponentProps<CheckboxProps>) {
  return (
    <label class={className}>
      <input type="checkbox" name={name} checked={isChecked} {...hxAttributes} />
      {children}
    </label>
  );
}
