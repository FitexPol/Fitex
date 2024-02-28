import { type ComponentProps, type FormControl } from '../../types';

type SwitchProps = {
  control: Omit<FormControl, 'type'>;
  checked?: boolean;
};

export function Switch({ control, checked, class: className, children }: ComponentProps<SwitchProps>) {
  return (
    <label class={className}>
      {children}
      <input name={control.name} type="checkbox" role="switch" checked={checked} />
    </label>
  );
}
