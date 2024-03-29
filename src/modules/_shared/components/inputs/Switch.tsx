import type { FormControl, PropsWithClass } from '../../types';

type SwitchProps = {
  control: Omit<FormControl, 'type'>;
  checked?: boolean;
};

export function Switch({
  control,
  checked,
  class: className,
  children,
}: Html.PropsWithChildren<PropsWithClass<SwitchProps>>) {
  return (
    <label class={className}>
      {children}
      <input name={control.name} type="checkbox" role="switch" checked={checked} />
    </label>
  );
}
