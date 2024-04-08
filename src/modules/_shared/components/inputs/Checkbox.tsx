import { type PropsWithClass } from '../../types';

type CheckboxProps = Htmx.Attributes & {
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
}: Html.PropsWithChildren<PropsWithClass<CheckboxProps>>) {
  return (
    <label class={className}>
      <input type="checkbox" name={name} checked={isChecked} {...hxAttributes} onchange={onchange} />
      {children}
    </label>
  );
}
